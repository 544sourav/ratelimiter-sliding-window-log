const express = require("express");
const rateLimiter = require("./middelware/ratelimiter");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Apply rate limiter globally
app.use(rateLimiter);

// Example routes
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
