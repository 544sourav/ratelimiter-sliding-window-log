const express = require("express");
const router = express.Router();

router.get("/data", (req, res) => {
  res.json({ message: "You accessed protected data!" });
});

module.exports = router;
