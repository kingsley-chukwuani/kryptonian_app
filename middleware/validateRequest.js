// Import  module from express-validator
const { body, validationResult } = require("express-validator");

// Define validation rules for registration
const validateRegistration = [
  // Check if email is valid
  body("email").isEmail().withMessage("Invalid email"),
  // Check if password is at least 6 characters long
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  // Middleware to return errors if validation fails
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define validation rules for login
const validateLogin = [
  // Check if email is valid
  body("email").isEmail().withMessage("Invalid email"),
  // Check if password is not empty
  body("password").not().isEmpty().withMessage("Password is required"),
  // Middleware to return errors if validation fails
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define validation rules for OTP
const validateOTP = [
  // Check if email is valid
  body("email").isEmail().withMessage("Invalid email"),
  // Check if OTP is exactly 6 digits
  body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
  // Middleware to return errors if validation fails
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define validation rules for generating API key
const validateGenerateApiKey = [
  // Check if email is valid
  body("email").isEmail().withMessage("Invalid email"),
  // Middleware to return errors if validation fails
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define validation rules for invalidating API key
const validateInvalidateApiKey = [
  // Check if API key is not empty
  body("apiKey").not().isEmpty().withMessage("API key is required"),
  // Middleware to return errors if validation fails
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Define validation rules for API key
const validateApiKey = [
  // Check if API key is not empty
  body("apiKey").not().isEmpty().withMessage("API key is required"),
  // Middleware to return errors if validation fails
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Export all validation rules
module.exports = {
  validateRegistration,
  validateLogin,
  validateOTP,
  validateGenerateApiKey,
  validateInvalidateApiKey,
  validateApiKey,
};
