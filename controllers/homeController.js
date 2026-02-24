const Article = require('../models/Article');
const Creator = require('../models/Creator');

exports.getHomeData = async (req, res) => {
  try {
    // डेटाबेसमधून लेटेस्ट १० आर्टिकल्स आणि ३ क्रिएटर्स आणणे
    const articles = await Article.find().sort({ createdAt: -1 }).limit(10);
    const creators = await Creator.find().limit(3);

    // 1. Slides (टॉप ३ आर्टिकल्स)
    const slides = articles.slice(0, 3).map(a => ({
      postId: a._id,
      title: a.title,
      subtitle: a.desc,
      // जर खरी इमेज नसेल तर भारी Unsplash इमेज दाखवा
      image: a.coverClass && a.coverClass.startsWith('data:image') ? a.coverClass : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
    }));

    // 2. Featured Blog (चौथा आर्टिकल)
    const featuredBlog = articles[3] ? {
      id: articles[3]._id,
      title: articles[3].title,
      excerpt: articles[3].desc,
      image: articles[3].coverClass && articles[3].coverClass.startsWith('data:image') ? articles[3].coverClass : 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      tag: articles[3].tag
    } : slides[0];

    // 3. Latest Articles (पुढचे ४ आर्टिकल्स)
    const latestArticles = articles.slice(4, 8).map(a => ({
      id: a._id,
      title: a.title,
      excerpt: a.desc,
      image: a.coverClass && a.coverClass.startsWith('data:image') ? a.coverClass : 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e',
      tag: a.tag,
      readTime: a.readTime,
      author: a.author,
      authorImg: `https://api.dicebear.com/7.x/avataaars/svg?seed=${a.author}`
    }));

    // 4. Top Writers (डेटाबेसमधून)
    const topWriters = creators.map(c => ({
      name: c.name,
      role: c.bio || 'Creator',
      img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`
    }));

    // 5. Categories & Collections (सध्या बॅकएंडमधून स्टॅटिक पाठवूया)
    const categories = [
      { name: 'Technology', count: '12k', icon: '💻', color: 'from-blue-500 to-cyan-500' },
      { name: 'Design', count: '8k', icon: '🎨', color: 'from-pink-500 to-rose-500' },
      { name: 'Startups', count: '15k', icon: '🚀', color: 'from-orange-500 to-red-500' },
      { name: 'Philosophy', count: '5k', icon: '🧠', color: 'from-purple-500 to-indigo-500' },
      { name: 'Culture', count: '9k', icon: '🌍', color: 'from-teal-500 to-emerald-500' }
    ];

    const collections = [
      { title: 'The AI Revolution', subtitle: '12 Stories', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995', link: '/category/ai' },
      { title: 'Startup Playbook', subtitle: '8 Stories', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7', link: '/category/startups' }
    ];

    const trendingTopics = ['#ArtificialIntelligence', '#WebDevelopment', '#Travel', '#Health', '#Startup', '#India'];

    // फायनल रिस्पॉन्स पाठवणे
    res.status(200).json({
      success: true,
      data: { slides, featuredBlog, latestArticles, topWriters, categories, collections, trendingTopics }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};