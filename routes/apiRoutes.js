const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

const { getExploreData, createArticle, getArticleById, getArticlesByCategory } = require('../controllers/exploreController');
const { submitApplication } = require('../controllers/partnerController');
const { getHomeData } = require('../controllers/homeController');

// Explore Page Routes
router.get('/explore', getExploreData);
router.post('/articles', createArticle); // Create Post साठी
router.get('/home', getHomeData);
router.post('/register', registerUser);
router.post('/login', loginUser);


// 🔴 महत्वाचा बदल: Category चा राऊट 'वर' पाहिजे!
router.get('/articles/category/:category', getArticlesByCategory);

// 🔴 ID चा राऊट नेहमी सर्वात 'खाली' पाहिजे!
router.get('/articles/:id', getArticleById);


// Creator Partner Routes
router.post('/apply', submitApplication);

module.exports = router;