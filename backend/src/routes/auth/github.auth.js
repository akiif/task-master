// routes/auth/github.auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// import config
const urlConfig = require('../../config/url.config.json');

// define const
const CLIENT_URL = urlConfig.CLIENT_URL;

// @route GET auth/github/
// @description login/register user with github
// @access Public
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// @route GET auth/github/redirect/
// @description login/register user with github
// @access Public
router.get('/github/redirect',
  passport.authenticate('github', {
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    res.redirect(`${CLIENT_URL}/`);
});

module.exports = router;