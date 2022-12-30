// routes/auth/twitter.auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// import config
const urlConfig = require('../../config/url.config.json');

// define const
const CLIENT_URL = urlConfig.CLIENT_URL;

// @route GET auth/twitter/
// @description login/register user with twitter
// @access Public
router.get('/twitter', passport.authenticate('twitter'));

// @route GET auth/twitter/redirect/
// @description login/register user with twitter
// @access Public
router.get('/twitter/redirect',
  passport.authenticate('twitter', {
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    res.redirect(`${CLIENT_URL}/`);
});

module.exports = router;