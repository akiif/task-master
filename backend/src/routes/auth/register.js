// routes/auth/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Load Model
const User = require('../../models/User');

// @route GET register/
// @description dummy register page for testing
// @access Public
router.get("/register", (req, res) => {
  res.json({message: "Register Page"});
});

// @route POST register/
// @description submit new user registration req
// @access Public
router.post("/register", (req, res) => {
  User.findOne({
    $or: [{
      email: req.body.email
    }, {
      username: req.body.username
    }]
  }, async (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: "Unable to register!",
        isRegistered: false
      });
    }
    if (user) {
      let errors = {};
      if (user.username === req.body.username) {
        errors.username = "User Name already exists!"
      } 
      if (user.email === req.body.email) {
        errors.email = "Email already exists!"
      }
      errors.isRegistered = false;
      return res.status(400).json(errors);
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        "username": req.body.username,
        "email": req.body.email,
        "password": hashPassword
      });
      await newUser.save(async (err, result) => {
        if (!err) {await User.findByIdAndUpdate({_id: result._id}, {userId: result._id});}
      });
      // await newUser.save();
      res.status(200).json({
        isRegistered: true
      });
    }
  })
});

module.exports = router;