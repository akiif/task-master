// routes/auth/facebook.auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// import config
const urlConfig = require('../../config/url.config.json');

// define const
const CLIENT_URL = urlConfig.CLIENT_URL;

// @route GET auth/facebook/
// @description login/register user with facebook
// @access Public
router.get('/facebook', passport.authenticate('facebook'));

// @route GET auth/facebook/redirect/
// @description login/register user with facebook
// @access Public
router.get('/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    res.redirect(`${CLIENT_URL}/`);
});

module.exports = router;