import { redis } from "../lib/redis.js";

const LOCK_LEVELS = [10, 30, 60, 1440]; //LOCK LEVELS (MIN)

const attemptsKey = (key) => `forgot:attempts:${key}`;
const lockKey = (key) => `forgot:lock:${key}`;
const levelKey = (key) => `forgot:level:${key}`;

export async function getForgotLock(key) {
  return await redis.get(lockKey(key));
}

export async function incrementForgotAttempts(key) {
  const attempts = await redis.incr(attemptsKey(key));

  if (attempts === 1) {
    await redis.expire(attemptsKey(key), 15 * 60); //15 MIN WINDOW OPEN
  }

  return attempts;
}

export async function applyForgotLock(key) {
  let level = Number(await redis.get(levelKey(key))) || 0;
  level = Math.min(level, LOCK_LEVELS.length - 1);

  const minutes = LOCK_LEVELS[level];

  await redis.set(lockKey(key), "1", {
    ex: minutes * 60,
  });

  await redis.set(levelKey(key), level + 1, {
    ex: 24 * 60 * 60,
  });

  return minutes;
}

export async function resetForgotProtection(key) {
  await redis.del(attemptsKey(key));
  await redis.del(lockKey(key));
  await redis.del(levelKey(key));
}

//EMAIL COOLDOWN
const emailCooldownKey = (email) => `forgot:email_cd:${email}`;

export async function isEmailCooldownActive(email) {
  return Boolean(await redis.get(emailCooldownKey(email)));
}

export async function setEmailCooldown(email, minutes = 10) {
  await redis.set(emailCooldownKey(email), "1", {
    ex: minutes * 60,
  });
}
