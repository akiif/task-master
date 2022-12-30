// routes/auth/logout.js
const express = require('express');
const router = express.Router();

// @route GET logout/
// @description logout user and destroy session
// @access Public
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.json({
        err: "Unable to logout!",
        loggedOut: false
      });
    } else {
      req.session.destroy();
      res.status(200).json({
        message: "You have Logged out successfully!",
        loggedOut: true
      });
    }
  });
});

module.exports = router;