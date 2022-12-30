// import modules
const express = require('express');
const FacebookStrategy = require("passport-facebook").Strategy;

// load Models
const User = require('../models/User');

// import config
const UrlConfig =  require('./url.config.json');

// define const
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const SERVER_URL = UrlConfig.SERVER_URL;

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${SERVER_URL}/auth/facebook/redirect`
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
      if (err) {
        console.log("Error\n");
        console.log(err);
        return cb(err, null);
      }
      if (user) {
        console.log("User\n");
        console.log(user);
        return cb(null, user);
      } else {
        const newUser = new User({
          facebookId: profile.id
        });
        newUser.save(async (err, user) => {
          if (!err) {await User.findByIdAndUpdate({_id: user._id}, {userId: user._id});}
          return cb(null, user);
        });
      }
    });
  }))
}