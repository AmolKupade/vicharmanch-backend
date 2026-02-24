const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // पाथ चेक कर

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // config/passport.js
callbackURL: "http://localhost:5000/api/users/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // १. चेक करा हा युजर आधीच डेटाबेसमध्ये आहे का?
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (!user) {
        // २. जर नसेल, तर Google च्या डेटावरून नवीन युजर बनवा
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value // गुगलचा खरा प्रोफाईल फोटो
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;