// routes/auth/google.auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// import config
const urlConfig = require('../../config/url.config.json');

// define const
const CLIENT_URL = urlConfig.CLIENT_URL;

// @route GET auth/google/
// @description login/register user with google
// @access Public
router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// @route GET auth/google/redirect/
// @description login/register user with google
// @access Public
router.get('/google/redirect',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    res.redirect(`${CLIENT_URL}/`);
});

module.exports = router;