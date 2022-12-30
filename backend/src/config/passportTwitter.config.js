// import modules
require("dotenv").config();
const TwitterStrategy = require('passport-twitter').Strategy;

// load Models
const User = require('../models/User');

// import config
const UrlConfig =  require('./url.config.json');

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const SERVER_URL = UrlConfig.SERVER_URL;

module.exports = (passport) => {
  passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: `${SERVER_URL}/auth/twitter/redirect`
  },
  (token, tokenSecret, profile, cb) => {
    User.findOne({twitterId: profile.id}, (err, user) => {
      if (err) {
        console.log(err);
        return cb(err, null);
      }
      if (user) {
        return cb(null, user);
      } else {
        const newUser = new User({
          twitterId: profile.id
        });
        newUser.save(async (err, user) => {
          if (!err) {await User.findByIdAndUpdate({_id: user._id}, {userId: user._id});}
          return cb(null, user);
        });
      }
    });
  }))
}