// import modules
require("dotenv").config();
const GitHubStrategy = require('passport-github2');

// load Models
const User = require('../models/User');

// import config
const UrlConfig =  require('./url.config.json');

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const SERVER_URL = UrlConfig.SERVER_URL;

module.exports = (passport) => {
  passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/auth/github/redirect`
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({githubId: profile.id}, (err, user) => {
      if (err) {
        console.log(err);
        return cb(err, null);
      }
      if (user) {
        return cb(null, user);
      } else {
        const newUser = new User({
          githubId: profile.id
        });
        newUser.save(async (err, user) => {
          if (!err) {await User.findByIdAndUpdate({_id: user._id}, {userId: user._id});}
          return cb(null, user);
        });
      }
    });
  }))
}