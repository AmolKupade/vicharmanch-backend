const mongoose = require('mongoose');

// models/User.js (किंवा जो तुझा पाथ असेल)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // 🔴 'required: true' काढून टाक
  googleId: { type: String }, // 🟢 नवीन फिल्ड
  role: { type: String, default: 'creator' },
  avatar: { type: String, default: 'bg-indigo-500' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);