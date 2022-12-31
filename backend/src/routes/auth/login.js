// routes/auth/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// import middleware
const authMiddleware = require('../../middleware/auth.middleware');

// @route GET login/
// @description test login page
// @access Public
router.get("/login", (req, res, next) => {
  res.json({ message: "Login Page" });
});

// @route POST login/
// @description submit login request
// @access Public
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      res.json({
        err: err,
        errorMessage: "Unable to Login.",
        isLoggedIn: false
      })
    }
    if (user === 'no-user') {
      res.status(401).json({
        errorMessage: "Incorrect Username",
        userError: "Incorrect Username",
        isLoggedIn: false
      });
    } else if (user === false) {
      res.status(401).json({
        errorMessage: "Incorrect Password",
        passwordError: "Incorrect Password",
        isLoggedIn: false
      });
    } else {
      req.logIn(user, err => {
        if (err) {
          res.status(401).json({
            errorMessage: "Unable to Login",
            isLoggedIn: false
          });
        }
        if (req.isAuthenticated()) {
          res.status(200).json({
            isLoggedIn: true
          });
        } else {
          res.status(401).json({
            errorMessage: "Unable to Login",
            isLoggedIn: false
          });
        }
      });
    }
  })(req,res,next);
});

// @route GET login/test
// @description test if user is loggedIn page
// @access Public
router.get("/login/test", authMiddleware.isLoggedIn(), (req, res) => {
  res.json({
    secrets: "This is a secrets page",
    username: req.user
  });
});

module.exports = router; 