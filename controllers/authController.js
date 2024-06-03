const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");
const cache = require("../cache");
const config = require("../config");

// Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      apiKey: "placeholder",
    });
    await user.save();
    await sendEmail(
      email,
      "Welcome to KryptoniteApp",
      "Thank you for registering!"
    );
    res.status(201).send("User registered successfully.");
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.code === 11000) {
      return res.status(400).send("Email already registered.");
    }
    res.status(500).send("Server error");
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).send("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", email);
      return res.status(400).send("Invalid email or password.");
    }

    const otp = generateOTP();
    cache.set(email, otp, 300); // Save OTP to cache with 5 minutes TTL
    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);
    res.send("OTP sent to your email.");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const cachedOtp = cache.get(email);
    if (!cachedOtp) return res.status(400).send("OTP expired or invalid.");

    if (cachedOtp !== otp) return res.status(400).send("Invalid OTP.");

    const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: "1h" });
    cache.del(email); // Remove OTP from cache after successful verification
    res.json({ token });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).send("Server error");
  }
};

// Generate API Key
exports.generateApiKey = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found.");

    const apiKey = require("crypto").randomBytes(32).toString("hex");
    cache.set(apiKey, email); // Save API key to cache
    user.apiKey = apiKey;
    await user.save();

    res.json({ apiKey });
  } catch (error) {
    console.error("Error during API key generation:", error);
    res.status(500).send("Server error");
  }
};

// Validate API Key
exports.validateApiKey = (req, res, next) => {
  const { apiKey } = req.body;
  if (!apiKey) {
    return res.status(400).send("API key is required");
  }
  next();
};

// Invalidate API Key
exports.invalidateApiKey = async (req, res) => {
  try {
    const { apiKey } = req.body;
    cache.del(apiKey); // Remove API key from cache

    await User.updateOne({ apiKey }, { $unset: { apiKey: "" } });
    res.send("API key invalidated.");
  } catch (error) {
    console.error("Error during API key invalidation:", error);
    res.status(500).send("Server error");
  }
};
