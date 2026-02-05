import { redis } from "../lib/redis.js";

/**
 * LOCK PROGRESS
 * 0 → 15 min
 * 1 → 30 min
 * 2 → 60 min
 * 3 → 120 min (MAX)
 */

const LOCK_LEVELS = [1, 2, 3, 4]; //LOCK LEVELS IN MUNUTES
const MAX_LEVEL = LOCK_LEVELS.length - 1;

//KEYS
const attemptsKey = (ip) => `register:attempts:${ip}`;
const lockKey = (ip) => `register:lock:${ip}`;
const captchaPendingKey = (ip) => `register:captcha_pending:${ip}`;
const lockCountKey = (ip) => `register:lock_count:${ip}`;

//GET LOCK
export async function getRegisterLock(ip) {
  return await redis.get(lockKey(ip));
}

//ADD TRY
export async function incrementRegisterAttempts(ip) {
  const key = attemptsKey(ip);

  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(key, 2 * 60 * 60);
  }

  return attempts;
}

//SET SOFT LOCK
export async function applyRegisterLock(ip, level) {
  const safeLevel = Math.min(level, MAX_LEVEL);
  const minutes = LOCK_LEVELS[safeLevel];

  const payload = {
    level: safeLevel,
    until: Date.now() + minutes * 60 * 1000,
  };

  await redis.set(lockKey(ip), JSON.stringify(payload), {
    ex: minutes * 60,
  });

  return minutes;
}

//RESET AFTER SUCCESS
export async function resetRegisterProtection(ip) {
  await redis.del(attemptsKey(ip));
  await redis.del(lockKey(ip));
}

export async function markCaptchaPending(ip, ttlSeconds = 6 * 60 * 60) {
  await redis.set(captchaPendingKey(ip), "1", { ex: ttlSeconds });
}

export async function isCaptchaPending(ip) {
  return Boolean(await redis.get(captchaPendingKey(ip)));
}

export async function clearCaptchaPending(ip) {
  await redis.del(captchaPendingKey(ip));
}

export async function resetLockCount(ip) {
  await redis.del(`register:lock_count:${ip}`);
}

export async function incrementRegisterLockCount(ip) {
  const count = await redis.incr(lockCountKey(ip));

  if (count === 1) {
    await redis.expire(lockCountKey(ip), 24 * 60 * 60);
  }

  //AFTER MAX + 1 DONT LET GROW
  if (count > MAX_LEVEL + 1) {
    return MAX_LEVEL + 1;
  }

  return count;
}

export async function isHardBlockedByMaxLevel(ip) {
  const count = await redis.get(lockCountKey(ip));
  if (!count) return false;

  //lockCount = 4 => level 3 (MAX)
  return Number(count) >= MAX_LEVEL + 1;
}

//BOT----------------------------------------------------
const botLockKey = (ip) => `register:bot_lock:${ip}`;
const botHardBlockKey = (ip) => `register:bot_hard:${ip}`;
const botCaptchaPendingKey = (ip) => `register:bot_captcha_pending:${ip}`;
const botOneShotKey = (ip) => `register:bot_one_shot:${ip}`;

//SOFT LOCK 1h
export async function applyBotSoftLock(ip) {
  await redis.set(botLockKey(ip), "1", { ex: 60 * 60 }); // 1h
}

//CHECK SOFT LOCK
export async function isBotSoftLocked(ip) {
  return Boolean(await redis.get(botLockKey(ip)));
}

//CAPTCHA AFTER LOCK
export async function markBotCaptchaPending(ip) {
  await redis.set(botCaptchaPendingKey(ip), "1", { ex: 6 * 60 * 60 }); // 6h
}

export async function isBotCaptchaPending(ip) {
  return Boolean(await redis.get(botCaptchaPendingKey(ip)));
}

export async function clearBotCaptchaPending(ip) {
  await redis.del(botCaptchaPendingKey(ip));
}

//HARD BLOCK 24h
export async function applyBotHardBlock(ip) {
  await redis.set(botHardBlockKey(ip), "1", { ex: 24 * 60 * 60 });
}

export async function isBotHardBlocked(ip) {
  return Boolean(await redis.get(botHardBlockKey(ip)));
}
export async function grantBotOneShot(ip) {
  //1 TRY, SHORT TTL
  await redis.set(botOneShotKey(ip), "1", { ex: 10 * 60 });
}

export async function hasBotOneShot(ip) {
  return Boolean(await redis.get(botOneShotKey(ip)));
}

export async function consumeBotOneShot(ip) {
  await redis.del(botOneShotKey(ip));
}
