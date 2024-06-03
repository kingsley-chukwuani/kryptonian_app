const User = require("../models/User");

const authenticateApiKey = async (req, res, next) => {
  try {
    const { apikey } = req.headers;
    if (!apikey) {
      return res.status(401).json({ message: "API key required" });
    }

    const user = await User.findOne({ apiKey: apikey });
    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticateApiKey;
