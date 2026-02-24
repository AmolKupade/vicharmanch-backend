const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, forgotPassword, googleAuth, twitterAuth } = require('../controllers/authController');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.get('/google', googleAuth);
router.get('/twitter', twitterAuth);

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:4200/auth' }), 
  (req, res) => {
    // यशस्वी लॉगिन झाल्यावर युजरसाठी JWT Token बनवणे
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // युजरचा डेटा URL मध्ये पाठवण्यासाठी एन्कोड करणे
    const userData = encodeURIComponent(JSON.stringify({
      id: req.user._id, 
      name: req.user.name, 
      email: req.user.email, 
      avatar: req.user.avatar
    }));
    
    // 🚀 Angular च्या होम पेजवर किंवा Auth पेजवर टोकन घेऊन रिडिरेक्ट करणे
    res.redirect(`http://localhost:4200/auth?token=${token}&user=${userData}`);
  }
);

module.exports = router;