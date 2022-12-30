// routes/auth/checkLogin.js
const express = require('express');
const router = express.Router();

// @route GET auth/check-logged-in
// @description check if an user is logged in
// @access Public
router.get("/check-logged-in", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isLoggedIn: true,
      userId: req.user.userId
    });
  } else {
    res.json({
      isLoggedIn: false,
      userId: ''
    });
  }
});

module.exports = router;