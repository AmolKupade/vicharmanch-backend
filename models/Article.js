const mongoose = require('mongoose');

// models/Article.js
const articleSchema = new mongoose.Schema({
  title: String,
  desc: String,
  content: String,
  author: String,
  tag: String,
  readTime: String,
  image: String, // 👈 हे फील्ड महत्त्वाचं आहे
  likes: { type: String, default: "0" },
  comments: { type: String, default: "0" },
  date: String
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);