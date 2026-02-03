import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../lib/redis.js";

//LOGIN LIMITERS
//IP
const loginIpBurst = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

const loginIpLong = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "15 m"),
});

//EMAIL
const loginEmailBurst = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

const loginEmailLong = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "15 m"),
});

//REGISTER LIMITERS
//IP ONLY
const registerIpBurst = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

const registerIpLong = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "15 m"),
});

//LOGIN LIMITER
export const loginLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || "unknown-ip";
    const email = req.body?.email?.toLowerCase();

    //IP BURST
    if (!(await loginIpBurst.limit(`login:ip:burst:${ip}`)).success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    //IP LONG
    if (!(await loginIpLong.limit(`login:ip:long:${ip}`)).success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    if (email) {
      //EMAIL BURST
      if (
        !(await loginEmailBurst.limit(`login:email:burst:${email}`)).success
      ) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
        });
      }

      //EMAIL LONG
      if (!(await loginEmailLong.limit(`login:email:long:${email}`)).success) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
        });
      }
    }

    next();
  } catch (err) {
    console.error("Login rate limit error:", err);
    next(); //FAIL-OPEN
  }
};

//REGISTER LIMITER
export const registerLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || "unknown-ip";

    //IP BURST
    if (!(await registerIpBurst.limit(`register:ip:burst:${ip}`)).success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    //IP LONG
    if (!(await registerIpLong.limit(`register:ip:long:${ip}`)).success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (err) {
    console.error("Register rate limit error:", err);
    next(); //FAIL-OPEN
  }
};
