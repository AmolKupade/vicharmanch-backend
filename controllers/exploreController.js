const Article = require('../models/Article');
const Creator = require('../models/Creator');
const Podcast = require('../models/Podcast');

// GET: पूर्ण एक्सप्लोर पेजचा डेटा
exports.getExploreData = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    const creators = await Creator.find().limit(10);
    const podcasts = await Podcast.find().limit(5);

    res.status(200).json({
      success: true,
      data: {
        feedArticles: articles,
        topCreators: creators,
        trendingPodcasts: podcasts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST: नवीन आर्टिकल बनवणे (Editor कडून)
exports.createArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json({ success: true, data: newArticle });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// controllers/exploreController.js मध्ये खालील कोड ॲड कर:

exports.getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// कॅटेगरीनुसार आर्टिकल्स मिळवणे
exports.getArticlesByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    // Database मध्ये 'tag' फील्ड आपण कॅटेगरीसाठी वापरलंय
    const articles = await Article.find({ 
      tag: { $regex: new RegExp(categoryName, "i") } 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};