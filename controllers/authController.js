const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER USER (नवीन अकाउंट बनवणे)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // युजर आधीपासून आहे का ते चेक करणे
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email!' });
    }

    // पासवर्ड Hashing (Encrypt करणे)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // नवीन युजर डेटाबेसमध्ये सेव्ह करणे
    user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // JWT Token बनवणे
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. LOGIN USER (लॉगिन करणे)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ईमेल डेटाबेसमध्ये शोधणे
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid Email or Password' });
    }

    // पासवर्ड मॅच करणे
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Email or Password' });
    }

    // पासवर्ड बरोबर असेल तर JWT Token देणे
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 1. Forgot Password Logic
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found with this email' });
    }

    // 🚀 इथे खऱ्या ॲपमध्ये आपण 'Reset Token' बनवतो आणि NodeMailer वापरून ईमेलवर लिंक पाठवतो.
    // सध्या आपण फक्त सक्सेस मेसेज पाठवूया.
    console.log(`Reset link would be sent to: ${email}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Password reset link has been sent to your email.' 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Google / Twitter OAuth (Redirects)
exports.googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email'] 
});

exports.twitterAuth = (req, res) => {
  res.status(200).json({ success: true, url: 'https://api.twitter.com/oauth/authenticate?...' });
};