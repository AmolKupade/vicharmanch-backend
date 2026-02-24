const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport'); // 👈 1. नवीन: Passport इम्पोर्ट केलं
require('dotenv').config();

// 👈 2. नवीन: Passport ची Google कॉन्फिगरेशन फाईल लोड करणे (ही फाईल आपण मागच्या स्टेपमध्ये 'config/passport.js' मध्ये बनवली होती)
require('./config/passport'); 

const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // 👈 3. नवीन: ॲपमध्ये Passport चालू केलं

// तुझा MongoDB Atlas चा लाईव्ह सर्व्हर कनेक्ट करणे
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('🔥 Live MongoDB Atlas Connected Successfully!'))
.catch((err) => console.log('❌ DB Connection Error:', err));

// API Routes
app.use('/api/v1', apiRoutes);
app.use('/api/users', authRoutes); // Auth चे सगळे राऊट्स (Login, Register, Google) इथे जातील

// Base Route
app.get('/', (req, res) => {
  res.send('VicharManch Backend is Live! 🚀');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});