const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  handle: { type: String, required: true },
  primaryNiche: { type: String, required: true },
  portfolioUrl: { type: String },
  twitterUrl: { type: String },
  linkedinUrl: { type: String },
  pitch: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);