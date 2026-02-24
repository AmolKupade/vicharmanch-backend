const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true },
  avatarBg: { type: String, default: 'bg-indigo-500' },
  verified: { type: Boolean, default: false },
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Creator', creatorSchema);