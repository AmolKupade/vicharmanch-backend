const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport'); // आपण मगाशी बनवलेली फाईल जोडणे

// १. जेव्हा युजर "Continue with Google" वर क्लिक करेल
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// २. जेव्हा Google यशस्वी लॉगिन करून युजरला बॅकएंडकडे परत पाठवेल
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:4200/auth' }), 
  (req, res) => {
    // यशस्वी झाल्यावर युजरसाठी JWT Token बनवणे
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // 🚀 मॅजिक: फ्रंटएंडला URL मध्ये टोकन देऊन रिडिरेक्ट करणे
    const userData = encodeURIComponent(JSON.stringify({
      id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar
    }));
    
    res.redirect(`http://localhost:4200/auth?token=${token}&user=${userData}`);
  }
);