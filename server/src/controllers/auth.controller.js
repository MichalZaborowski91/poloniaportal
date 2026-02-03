import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import crypto from "crypto";
import { sendVerifyEmail } from "../services/email.service.js";

const VERIFY_TOKEN_TTL = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN = 15 * 60 * 1000;

//REGISTER
export const register = async (req, res) => {
  try {
    const { email, password, company } = req.body;

    //HONEYPOT
    if (company && company.length > 0) {
      await new Promise((r) => setTimeout(r, 800));
      return res.status(200).json({ ok: true });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //FIND OUT ORIGIN
    const verifyOrigin =
      req.headers.origin || `${req.protocol}://${req.get("host")}`;

    //GENERATE TOKEN
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    //CREATE USER
    const user = await User.create({
      email,
      password,
      emailVerified: false,
      emailVerifyToken: hashedToken,
      emailVerifyExpires: tokenExpires,
      verifyOrigin,
    });

    //VERIFY LINK
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

    console.log("VERIFY EMAIL LINK:");
    console.log(verifyLink);

    console.log("NEW USER CREATED:", {
      email: user.email,
      emailVerified: user.emailVerified,
      verifyOrigin: user.verifyOrigin,
      emailVerifyToken: user.emailVerifyToken,
      emailVerifyExpires: user.emailVerifyExpires,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Register failed" });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.isDeleted) {
      return res.status(401).json({ message: "Account deleted" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
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
      await user.save();
      needsProfileOnboarding = true;
    }
    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      needsProfileOnboarding,
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

    console.log("EMAIL VERIFIED:", user.email);

    //REDIRECT TO FRONTEND ACCORDING TO ROUTING
    const redirectBase = user.verifyOrigin || process.env.FRONTEND_URL;
    res.redirect(`${redirectBase}/login?verified=true`);
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
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //SOFT DELETE
    user.isDeleted = true;
    user.deletedAt = new Date();

    //OPTIONAL - ANONYMIZATION
    user.email = `deleted_${user._id}@deleted.local`;
    user.profile = undefined;

    //CLEAR VERIFY TOKENS
    user.emailVerifyToken = undefined;
    user.emailVerifyExpires = undefined;

    await user.save();

    //KILL SESSION
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.json({ message: "Account deleted" });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
