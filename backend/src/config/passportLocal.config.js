// import modules
const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

// Load Model
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({
        username: username
      }, async (err, user) => {
        if (err) {throw err;}
        if (!user || user == null || user == undefined) {
          return done(null, "no-user");
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
          if (err) {return done(err);}
          if (result === true) {return done(null, user);}
          else {return done(null, false);}
        });
        }
      });
    })
  );
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