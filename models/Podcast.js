const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  host: { type: String, required: true },
  time: { type: String, required: true }, // उदा. '45m'
  bg: { type: String, default: 'from-blue-600 to-indigo-600' },
  audioUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Podcast', podcastSchema);