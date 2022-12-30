// import modules
require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// load Models
const User = require('../models/User');

// import config
const UrlConfig =  require('./url.config.json');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_URL = UrlConfig.SERVER_URL;

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${SERVER_URL}/auth/google/redirect`
  }, 
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({googleId: profile.id}, (err, user) => {
      if (err) {
        console.log(err);
        return cb(err, null);
      }
      if (user) {
        return cb(null, user);
      } else {
        const newUser = new User({
          googleId: profile.id
        });
        newUser.save(async (err, user) => {
          if (!err) {await User.findByIdAndUpdate({_id: user._id}, {userId: user._id});}
          return cb(null, user);
        });
      }
    });
  }));
}

// To use with sessions
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({
    _id: id
  }, (err, user) => {
    if (err) {return cb(err)}
    cb(err, user);
  });
});