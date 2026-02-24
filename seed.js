const mongoose = require('mongoose');
require('dotenv').config();

const Article = require('./models/Article');
const Creator = require('./models/Creator');
const Podcast = require('./models/Podcast');

const creatorsData = [
  { name: 'Vikram Joshi', handle: '@vikram_j', avatarBg: 'bg-indigo-500', verified: true, bio: 'Tech analyst and Web3 enthusiast focusing on India.' },
  { name: 'Aditi Sharma', handle: '@aditisharma', avatarBg: 'bg-rose-500', verified: true, bio: 'Mindfulness coach and Bio-hacker for creators.' },
  { name: 'Dr. Siddharth', handle: '@dr_siddharth', avatarBg: 'bg-purple-500', verified: true, bio: 'AI Researcher at Vichar Labs, Navi Mumbai.' },
  { name: 'Priya Deshmukh', handle: '@priya_travels', avatarBg: 'bg-teal-500', verified: true, bio: 'Exploring the hidden gems and culture of Maharashtra.' },
  { name: 'Karan Mehta', handle: '@karanm', avatarBg: 'bg-emerald-500', verified: false, bio: 'Startup founder building the future of SaaS.' },
  { name: 'Neha Singh', handle: '@neha_writes', avatarBg: 'bg-amber-500', verified: true, bio: 'Fiction author and modern poet.' },
  { name: 'Rahul Desai', handle: '@rahul_dev', avatarBg: 'bg-blue-500', verified: false, bio: 'Frontend engineer obsessed with UI/UX.' },
  { name: 'Sanjana Art', handle: '@sanjana_art', avatarBg: 'bg-fuchsia-500', verified: true, bio: 'Visual artist and Creative Director.' },
  { name: 'Amit Patel', handle: '@amit_indie', avatarBg: 'bg-cyan-500', verified: false, bio: 'Solopreneur making $10k+ MRR.' },
  { name: 'Sameer Sheikh', handle: '@sam_ai', avatarBg: 'bg-orange-500', verified: true, bio: 'Machine Learning specialist and gamer.' }
];

const articlesData = [
  {
    title: 'The AI Renaissance: How Machines Are Learning to Feel',
    desc: 'An in-depth look into the latest neural networks that simulate human empathy. Are we ready for emotional machines in 2026?',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    content: `
      <p>Artificial Intelligence has officially crossed the Rubicon. In 2026, we are no longer talking about chatbots; we are talking about entities that can perceive human emotions.</p>
      <h2>The Shift to Emotional Intelligence</h2>
      <p>Recent breakthroughs in neural networks have allowed AI to analyze human micro-expressions and vocal tremors to gauge psychological states.</p>
      <blockquote>"The question isn't whether machines can think, but whether they can care."</blockquote>
      <h3>Key Developments in 2026:</h3>
      <ul>
        <li>Real-time emotional mirroring in customer support.</li>
        <li>AI therapists with localized context for Indian languages.</li>
        <li>Neuromorphic chips that mimic human synapse firing.</li>
      </ul>
      <p>This renaissance brings both hope and fear. As we move forward, the definition of "being human" is under extreme scrutiny.</p>
    `,
    author: 'Dr. Siddharth',
    tag: 'Technology',
    readTime: '15 min read',
    likes: '14.2k',
    comments: '1.2k',
    date: 'Feb 23, 2026'
  },
  {
    title: 'Navi Mumbai: The New Silicon Valley of the East',
    desc: 'How hubs like Ulwe and Kharghar are becoming the epicenter of Indias next tech revolution and data infrastructure.',
    image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?q=80&w=2000&auto=format&fit=crop',
    content: `
      <p>The skyline of Navi Mumbai is changing. With the new International Airport and the MTHL bridge, the shift of power from Mumbai to the mainland is undeniable.</p>
      <h2>The Ulwe Hub</h2>
      <p>Ulwe is becoming a center for Edge Computing. Massive data centers are being built to reduce latency for 5G and 6G users across the region.</p>
      
      <h3>Why Navi Mumbai?</h3>
      <ul>
        <li>Planned infrastructure and wider roads.</li>
        <li>Proximity to major shipping and air ports.</li>
        <li>Abundance of space for server farms.</li>
      </ul>
      <p>Investors and developers are flocking to these nodes, creating a vibrant ecosystem for tech startups.</p>
    `,
    author: 'Vikram Joshi',
    tag: 'Startups',
    readTime: '10 min read',
    likes: '9.8k',
    comments: '450',
    date: 'Feb 20, 2026'
  },
  {
    title: 'The Silent Killer of Creativity: Constant Connectivity',
    desc: 'Why your smartphone is stealing your best ideas and how a "Digital Sabbath" can reset your brain for peak output.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop',
    content: `
      <p>We are the most connected generation in history, but also the most distracted. Boredom is necessary for the brain to enter its creative "Default Mode Network."</p>
      <h2>What is Digital Overload?</h2>
      <p>When you fill every silent second with a reel or a podcast, your brain loses the ability to wander and solve complex problems internally.</p>
      <blockquote>"Boredom is the precursor to breakthrough."</blockquote>
      <h3>The 24-Hour Digital Sabbath Plan:</h3>
      <ul>
        <li>Saturday 6 PM to Sunday 6 PM: No screens.</li>
        <li>Read physical books or walk in nature.</li>
        <li>Observe the cadence of life around you.</li>
      </ul>
    `,
    author: 'Aditi Sharma',
    tag: 'Lifestyle',
    readTime: '8 min read',
    likes: '11.5k',
    comments: '670',
    date: 'Feb 18, 2026'
  },
  {
    title: 'Building a Micro-SaaS in 30 Days (A Transparent Guide)',
    desc: 'I documented every step, bug, and marketing strategy used to build and launch a profitable SaaS product in exactly one month.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    content: `
      <p>Can you build a profitable business in a month? Yes, if you focus on a specific problem rather than a generic solution.</p>
      <h2>Day 1-10: Problem Validation</h2>
      <p>I spoke to 50 creators about their biggest friction point: Newsletter formatting. I decided to solve only that.</p>
      <h3>The Tech Stack:</h3>
      <ul>
        <li>Angular 19 for the UI.</li>
        <li>Node.js + MongoDB for the backend.</li>
        <li>Tailwind CSS for rapid styling.</li>
      </ul>
      <p>By day 30, the product hit $500 MRR with zero ad spend.</p>
    `,
    author: 'Karan Mehta',
    tag: 'Startups',
    readTime: '12 min read',
    likes: '7.2k',
    comments: '180',
    date: 'Feb 15, 2026'
  },
  {
    title: 'Modern Mythology: Reimagining Ancient Wisdom',
    desc: 'Why ancient stories are trending again in the tech era and what they teach us about building ethical software.',
    image: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?q=80&w=2000&auto=format&fit=crop',
    content: `
      <p>Ancient epics like the Ashtavakra Gita are seeing a revival among tech leaders. It is about seeking stillness in a world of high-velocity code.</p>
      <h2>The Connection Between Code and Philosophy</h2>
      <p>Structure, logic, and ethics are common to both. Building an AI without philosophy is like building a ship without a compass.</p>
    `,
    author: 'Neha Singh',
    tag: 'Culture',
    readTime: '9 min read',
    likes: '4.9k',
    comments: '230',
    date: 'Feb 12, 2026'
  },
  {
    title: 'Web3 & The Decentralized Social Media Revolution',
    desc: 'Why the era of centralized walled gardens is ending and how creators are taking back ownership of their audience.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
    content: `
      <p>Platforms like X and Instagram own your data. In Web3, you own your identity and your relationship with your followers.</p>
      
      <p>This is the year of "Social Tokens" and peer-to-peer monetization.</p>
    `,
    author: 'Rohan V',
    tag: 'Technology',
    readTime: '11 min read',
    likes: '15.2k',
    comments: '1.1k',
    date: 'Feb 10, 2026'
  }
];

const podcastsData = [
  { title: 'The Future of Content', host: 'Vikram Joshi', time: '45m', bg: 'from-indigo-600 to-purple-600' },
  { title: 'Navi Mumbai Tech Hub', host: 'Rahul Desai', time: '32m', bg: 'from-blue-600 to-cyan-600' },
  { title: 'AI Ethics in 2026', host: 'Dr. Siddharth', time: '55m', bg: 'from-rose-500 to-red-600' },
  { title: 'The Indie Hacker Playbook', host: 'Amit Patel', time: '1h 05m', bg: 'from-slate-700 to-slate-900' },
  { title: 'Mindfulness for Devs', host: 'Aditi Sharma', time: '25m', bg: 'from-emerald-500 to-teal-600' },
  { title: 'Design & Humanity', host: 'Sanjana Art', time: '42m', bg: 'from-pink-500 to-rose-500' },
  { title: 'Web3 Decoded', host: 'Rohan V', time: '38m', bg: 'from-amber-500 to-orange-500' }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔥 MongoDB Connected for Seeding!');

    await Creator.deleteMany();
    await Article.deleteMany();
    await Podcast.deleteMany();
    console.log('🗑️ Old Data Cleared!');

    await Creator.insertMany(creatorsData);
    await Article.insertMany(articlesData);
    await Podcast.insertMany(podcastsData);
    
    console.log('✅ MEGA DATA IMPORTED SUCCESSFULLY!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1); 
  }
};

importData();