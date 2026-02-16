import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import crypto from "crypto";
import { sendVerifyEmail, sendResetEmail } from "../services/email.service.js";
import {
  getRegisterLock,
  incrementRegisterAttempts,
  applyRegisterLock,
  resetRegisterProtection,
  isCaptchaPending,
  markCaptchaPending,
  clearCaptchaPending,
  resetLockCount,
  incrementRegisterLockCount,
  isHardBlockedByMaxLevel,
  isBotHardBlocked,
  isBotSoftLocked,
  isBotCaptchaPending,
  applyBotSoftLock,
  markBotCaptchaPending,
  grantBotOneShot,
  hasBotOneShot,
  consumeBotOneShot,
  applyBotHardBlock,
} from "../services/registerLock.service.js";
import { verifyCaptcha } from "../services/captcha.service.js";
import { getClientIp } from "../../utils/getClientIp.js";
import {
  getForgotLock,
  incrementForgotAttempts,
  applyForgotLock,
  isEmailCooldownActive,
  setEmailCooldown,
} from "../services/forgotPasswordLock.service.js";

const VERIFY_TOKEN_TTL = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN = 15 * 60 * 1000;

//REGISTER
export const register = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { email, password, company, captchaToken, timeStamp } = req.body;

    //BOT FLOW
    //BOT VALIDATION
    const isBot =
      (typeof company === "string" && company.length > 0) ||
      (typeof company === "string" && company.length > 0 && timeStamp < 300);

    //IF BOT === TRUE CHECK IF IS HARD BLOCKED (24H)
    if (isBot) {
      const hardBlocked = await isBotHardBlocked(ip);
      if (hardBlocked) {
        return res.status(429).json({ locked: true });
      }
    }

    if (isBot) {
      const hasOneShot = await hasBotOneShot(ip);
      if (hasOneShot) {
        await consumeBotOneShot(ip);
        await applyBotHardBlock(ip);

        return res.status(429).json({
          locked: true,
        });
      }
    }

    if (isBot) {
      const softLocked = await isBotSoftLocked(ip);
      if (softLocked) {
        return res.status(429).json({ locked: true });
      }
    }

    if (isBot) {
      const botCaptchaPending = await isBotCaptchaPending(ip);
      if (botCaptchaPending) {
        const captchaOk = await verifyCaptcha(captchaToken, ip);
        if (!captchaOk) {
          //FAIL → HARD BLOCK (24H)
          await applyBotHardBlock(ip);
          return res.status(429).json({ locked: true });
        }
        //CAPTCHA OK => 1 MORE CHANCE
        await clearBotCaptchaPending(ip);
        await grantBotOneShot(ip);

        return res.status(200).json({ ok: true });
      }
    }

    if (isBot) {
      await applyBotSoftLock(ip);
      await markBotCaptchaPending(ip);
      //FAKE SUCCESS
      return res.status(200).json({ ok: true });
    }

    //HARD BLOCK AFTER MAX LEVEL (24h)
    const hardBlocked = await isHardBlockedByMaxLevel(ip);

    if (hardBlocked) {
      return res.status(429).json({
        locked: true,
      });
    }

    //USER FLOW

    //SOFT LOCK
    const activeLock = await getRegisterLock(ip);
    if (activeLock) {
      return res.status(429).json({ locked: true });
    }

    //CAPTCHA AFTER LOCK
    const userCaptchaPending = await isCaptchaPending(ip);
    if (userCaptchaPending) {
      const captchaOk = await verifyCaptcha(captchaToken, ip);

      if (!captchaOk) {
        return res.status(429).json({ requireCaptcha: true });
      }

      //CAPTCHA OK => NEW TRIES
      await clearCaptchaPending(ip);
      await resetRegisterProtection(ip);
    }

    //VALIDATION (NUMBER OF TRIES)
    if (!email || !password) {
      const attempts = await incrementRegisterAttempts(ip);

      if (attempts % 5 === 0) {
        const level = Math.floor(attempts / 5) - 1;
        await applyRegisterLock(ip, level);
      }

      return res.status(400).json({
        errorCode: "MISSING_FIELDS",
      });
    }

    //EMAIL EXISTS (COUNT ENTRIES)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      //IF ACCOUNT EXISTS BUT SOFT-DELETED
      if (existingUser.isDeleted) {
        const now = new Date();

        //IF IS IN 14 DAYS RECOVERY PERIOD - DON'T LET REGISTER
        if (
          existingUser.deletionScheduledFor &&
          existingUser.deletionScheduledFor > now
        ) {
          return res.status(409).json({
            errorCode: "ACCOUNT_SCHEDULED_FOR_DELETION",
            restoreUntil: existingUser.deletionScheduledFor,
          });
        }

        //IF PASSED 14 DAYS BUT CRON DIDN'T DELETE YET
        //DELETE RECORD AND LET REGISTER
        await User.deleteOne({ _id: existingUser._id });
      } else {
        //ACCOUNT EXISTS
        const attempts = await incrementRegisterAttempts(ip);

        if (attempts % 5 === 0) {
          const lockCount = await incrementRegisterLockCount(ip);
          const level = lockCount - 1;

          await applyRegisterLock(ip, level);
          await markCaptchaPending(ip);
        }

        return res.status(409).json({
          errorCode: "USER_ALREADY_EXISTS",
        });
      }
    }

    //NORMAL REGISTRATION
    const verifyOrigin =
      req.headers.origin || `${req.protocol}://${req.get("host")}`;

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await User.create({
      email,
      password,
      emailVerified: false,
      emailVerifyToken: hashedToken,
      emailVerifyExpires: new Date(Date.now() + VERIFY_TOKEN_TTL),
      verifyOrigin,
    });

    const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify-email/${rawToken}`;

    await sendVerifyEmail({
      to: user.email,
      verifyLink,
    });

    //FULL RESET AFTER SUCCESS
    await resetRegisterProtection(ip);
    await resetLockCount(ip);

    return res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ errorCode: "REGISTER_FAILED" });
  }
};

//LOGIN
const LOGIN_LOCKS = [
  15 * 60 * 1000, //LEVEL 1
  30 * 60 * 1000, //LEVEL 2
  60 * 60 * 1000, //LEVEL 3
  2 * 60 * 60 * 1000, //LEVEL 4 (MAX)
];

export const login = async (req, res) => {
  try {
    const { email, password, rememberMe, captchaToken } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email });
    let accountRestored = false;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.isDeleted) {
      const now = new Date();

      //IF IN 14 DAYS PERIOD - RESTORE
      if (user.deletionScheduledFor && user.deletionScheduledFor > now) {
        user.isDeleted = false;
        user.deletedAt = null;
        user.deletionScheduledFor = null;
        accountRestored = true;

        await user.save();
      } else {
        return res.status(403).json({
          message: "Account permanently deleted",
        });
      }
    }

    //SOFT LOCK CHECK
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMs = user.lockUntil.getTime() - Date.now();

      return res.status(423).json({
        message: "Account temporarily locked. Try again later.",
        lockRemaining: remainingMs,
      });
    }

    if (user.captchaRequired) {
      if (!captchaToken) {
        return res.status(403).json({
          requireCaptcha: true,
        });
      }

      const captchaOk = await verifyCaptcha(captchaToken);

      if (!captchaOk) {
        return res.status(403).json({
          requireCaptcha: true,
        });
      }

      //CAPTCHA OK => LET TRY
      user.captchaRequired = false;
      await user.save();
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts % 5 === 0) {
        const level = Math.floor(user.failedLoginAttempts / 5) - 1;
        const lockTime = LOGIN_LOCKS[Math.min(level, LOGIN_LOCKS.length - 1)];

        user.lockUntil = new Date(Date.now() + lockTime);
        user.captchaRequired = true;
      }

      await user.save();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //SUCCESSFUL LOGIN - RESET SOFT LOCK STATE
    let shouldSave = false;

    if (user.failedLoginAttempts > 0) {
      user.failedLoginAttempts = 0;
      shouldSave = true;
    }

    if (user.lockUntil) {
      user.lockUntil = null;
      shouldSave = true;
    }
    if (user.captchaRequired) {
      user.captchaRequired = false;
      shouldSave = true;
    }

    //JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    //COOKIE httpOnly
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    if (rememberMe) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 DAYS
    }

    //IF rememberMe === false => SESSION COOKIE
    res.cookie("auth_token", token, cookieOptions);

    let needsProfileOnboarding = false;

    if (!user.firstLoginAt) {
      user.firstLoginAt = new Date();
      shouldSave = true;
      needsProfileOnboarding = true;
    }

    if (shouldSave) {
      await user.save();
    }

    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      needsProfileOnboarding,
      accountRestored,
    });
  } catch (error) {
    console.error("LOGIN ERROR", error);
    res.status(500).json({ message: "Login failed" });
  }
};

//ME
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

//LOGOUT
export const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.json({ message: "Logged out" });
};

//VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    //TOKEN HASH FROM URL HAS TO MATCH TO DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerifyToken: hashedToken,
      emailVerifyExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired verification link");
    }

    user.emailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpires = undefined;

    await user.save();

    //REDIRECT TO FRONTEND ACCORDING TO ROUTING
    const redirectBase = user.verifyOrigin || process.env.FRONTEND_URL;
    res.redirect(`${redirectBase}/?verified=true`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Email verification failed");
  }
};

export const resendVerifyEmail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    const now = Date.now();

    //COOLDOWN CHECK
    if (user.emailVerifyExpires) {
      const lastSentAt = user.emailVerifyExpires.getTime() - VERIFY_TOKEN_TTL;

      if (now - lastSentAt < RESEND_COOLDOWN) {
        const waitSeconds = Math.ceil(
          (RESEND_COOLDOWN - (now - lastSentAt)) / 1000,
        );

        return res.status(429).json({
          message: `Please wait ${waitSeconds}s before requesting another email`,
        });
      }
    }

    //GENERATE NEW TOKEN
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.emailVerifyToken = hashedToken;
    user.emailVerifyExpires = new Date(now + VERIFY_TOKEN_TTL);

    await user.save();

    const verifyLink = `${process.env.BACKEND_URL}/api/auth/verify-email/${rawToken}`;

    try {
      await sendVerifyEmail({
        to: user.email,
        verifyLink,
      });
      console.log("VERIFY EMAIL SENT");
    } catch (err) {
      console.error("EMAIL SEND ERROR:", err);
    }

    res.json({ message: "Verification email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to resend email" });
  }
};

//DELETE ACCOUNT
export const deleteAccount = async (req, res) => {
  try {
    const { password, captchaToken } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // PASSWORD CHECK
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // CAPTCHA CHECK
    const captchaOk = await verifyCaptcha(captchaToken);
    if (!captchaOk) {
      return res.status(400).json({ message: "Captcha failed" });
    }

    // SOFT DELETE (14 days)
    const now = new Date();
    const restoreUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    user.isDeleted = true;
    user.deletedAt = now;
    user.deletionScheduledFor = restoreUntil;

    await user.save();

    // LOGOUT
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.json({
      message: "Account scheduled for deletion",
      restoreUntil,
    });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

//FORGOT PASSWORD FLOW
export const forgotPassword = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const { email, captchaToken, country } = req.body;

    //ALWAYS SUCCESS !
    const successResponse = () => res.json({ success: true });

    if (!email) {
      return successResponse();
    }

    const key = `${ip}:${email.toLowerCase()}`;

    //CAPTCHA ALWAYS REQUIRED
    const captchaOk = await verifyCaptcha(captchaToken);
    if (!captchaOk) {
      return successResponse();
    }

    //ACTIVE LOCK
    const locked = await getForgotLock(key);
    if (locked) {
      return successResponse();
    }

    //COUNT ATTEMPTS
    const attempts = await incrementForgotAttempts(key);

    if (attempts % 5 === 0) {
      await applyForgotLock(key);
    }

    //FIND USER (NO INFO LEAK)
    const user = await User.findOne({
      email: email.toLowerCase(),
      isDeleted: false,
    });

    if (!user) {
      return successResponse();
    }

    //EMAIL COOLDOWN CHECK (ANTI MAIL FLOOD)
    const cooldownActive = await isEmailCooldownActive(user.email);
    if (cooldownActive) {
      return successResponse();
    }

    //GENERATE TOKEN
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);

    const baseOrigin = req.headers.origin || process.env.FRONTEND_URL;

    await user.save();

    const resetLink = country
      ? `${baseOrigin}/${country}/reset-password/${rawToken}`
      : `${baseOrigin}/reset-password/${rawToken}`;

    await sendResetEmail({
      to: user.email,
      resetLink,
    });

    //SET EMAIL COOLDOWN (10 min)
    await setEmailCooldown(user.email);

    return successResponse();
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    return res.json({ success: true });
  }
};

//RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    //HASH TOKEN
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    //FIND USER WITH VALID TOKEN
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
      isDeleted: false,
    });

    if (!user) {
      return res.status(400).json({
        message: "Link jest nieprawidłowy lub wygasł.",
      });
    }

    //PASSWORD REUSE PROTECTION
    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "Nowe hasło musi być inne niż poprzednie.",
      });
    }

    //SET NEW PASSWORD
    user.password = password;

    user.passwordChangedAt = new Date();
    //INVALIDATE TOKEN (ONE-TIME USE)
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    //OPTIONAL: RESET LOGIN PROTECTION
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    user.captchaRequired = false;

    await user.save();

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    return res.status(500).json({
      message: "Reset failed",
    });
  }
};

//CHECK IF RESET LINK EXPIRES
export const validateResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
      isDeleted: false,
    });

    if (!user) {
      return res.status(400).json({
        valid: false,
      });
    }

    return res.json({
      valid: true,
    });
  } catch (err) {
    return res.status(400).json({
      valid: false,
    });
  }
};

//CHANGE PASSWORD (LOGGED USER)
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    //MISSING FIELDS
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        code: "MISSING_FIELDS",
        message: "All fields are required",
      });
    }

    //PASSWORD CONDITIONS
    if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      return res.status(400).json({
        code: "PASSWORD_WEAK",
        message: "Password weak",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user || user.isDeleted) {
      return res.status(404).json({
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    //CHECK CURRENT PASSWORD
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        code: "INVALID_CURRENT_PASSWORD",
        message: "Current password is incorrect",
      });
    }

    //PREVENT REUSING SAME PASSWORD
    const isSame = await user.comparePassword(newPassword);
    if (isSame) {
      return res.status(400).json({
        code: "PASSWORD_SAME_AS_OLD",
        message: "New password must be different",
      });
    }

    //SET NEW PASSWORD
    user.password = newPassword;
    user.passwordChangedAt = new Date();

    //RESET LOGIN PROTECTION
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    user.captchaRequired = false;

    await user.save();

    return res.json({
      success: true,
      code: "PASSWORD_CHANGED",
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    return res.status(500).json({
      code: "CHANGE_PASSWORD_FAILED",
      message: "Failed to change password",
    });
  }
};
