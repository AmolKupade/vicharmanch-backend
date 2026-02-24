const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, googleAuth, twitterAuth } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.get('/google', googleAuth);
router.get('/twitter', twitterAuth);

module.exports = router;