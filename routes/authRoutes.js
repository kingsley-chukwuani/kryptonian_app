const express = require('express');
const { register, login, verifyOTP, generateApiKey, invalidateApiKey } = require('../controllers/authController');
const { validateRegistration, validateLogin, validateOTP, validateApiKey, validateInvalidateApiKey } = require('../middleware/validateRequest');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/verify-otp', validateOTP, verifyOTP);
router.post('/generate-api-key',  generateApiKey);
router.post('/invalidate-api-key', validateApiKey, invalidateApiKey);

module.exports = router;