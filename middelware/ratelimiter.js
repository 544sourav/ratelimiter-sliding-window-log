const Redis = require("ioredis");
const redis = new Redis(); 

const WINDOW_SIZE_IN_SECONDS = 60; 
const MAX_REQUESTS = 10; 

async function rateLimiter(req, res, next) {
  try {
    const userIP = req.ip; 
    const currentTime = Date.now();

    const redisKey = `rate_limit:${userIP}`;

    // Remove old timestamps outside the window
    await redis.zremrangebyscore(
      redisKey,
      0,
      currentTime - WINDOW_SIZE_IN_SECONDS * 1000
    );

    // Count requests inside window
    const requestCount = await redis.zcard(redisKey);

    if (requestCount >= MAX_REQUESTS) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    // Add current request timestamp
    await redis.zadd(redisKey, currentTime, currentTime);

    // Set expiry so Redis doesn’t grow forever
    await redis.expire(redisKey, WINDOW_SIZE_IN_SECONDS);

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = rateLimiter;
