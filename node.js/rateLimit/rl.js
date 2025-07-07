/*
============================================
📘 Rate Limiting in Node.js using Redis
============================================

🧠 What is Rate Limiting?
Rate limiting is the process of controlling how many requests a client can make to a server within a specific timeframe. It's crucial for preventing abuse, reducing server load, and improving performance.

📌 Use Cases:
- Prevent brute-force attacks (e.g., login attempts)
- Protect APIs from abuse and overuse
- Enforce fair usage policies for public APIs
- Prevent denial-of-service (DoS) attacks

⚙️ How It Works (Fixed Window Algorithm):
- Identify the client by IP or API key.
- Track the number of requests in a defined time window (e.g., 60 seconds).
- Use Redis to store request count and automatically reset it after the time window expires.

📦 Tools Used:
- Express.js (Web framework)
- Redis (In-memory data store)
- ioredis (Redis client for Node.js)

This implementation uses a simple Fixed Window Counter algorithm.
*/

// rateLimiter.js
const Redis = require("ioredis");
const redis = new Redis(); // Connects to localhost:6379 by default

function rateLimiter({ windowInSeconds, maxRequests }) {
  return async (req, res, next) => {
    const key = `rate_limit:${req.ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowInSeconds); // Set TTL for rate limit key
    }

    if (current > maxRequests) {
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }

    res.set("X-RateLimit-Limit", maxRequests);
    res.set("X-RateLimit-Remaining", Math.max(0, maxRequests - current));
    next();
  };
}

module.exports = rateLimiter;

// app.js
const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();

// Apply rate limiter middleware globally
app.use(rateLimiter({ windowInSeconds: 60, maxRequests: 10 }));

app.get("/", (req, res) => {
  res.send("Hello! You're within the rate limit.");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
