require("dotenv").config();
const express = require("express");
const connectDB = require('./config/db.config');
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');

// import routes
const users = require('./routes/api/user');
const login = require('./routes/auth/login');
const logout = require('./routes/auth/logout');
const register = require('./routes/auth/register');
const tasks = require('./routes/api/tasks.js');
const checkLogin = require('./routes/auth/checkLogin.auth');
const googleAuth = require('./routes/auth/google.auth');
const facebookAuth = require('./routes/auth/facebook.auth');
const twitterAuth = require('./routes/auth/twitter.auth');
const githubAuth = require('./routes/auth/github.auth');

// import config
const urlConfig = require('./config/url.config.json');

// define const
const CLIENT_URL = urlConfig.CLIENT_URL;

// load Models
const User = require("./models/User");

const app = express();

// Connect Database
const clientPromise = connectDB();

app.set('trust proxy', 1);

// Configure Sessions Middleware
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,  //don't save session if unmodified
  saveUninitialized: false,  // don't create session until something stored
  cookie: {
    // sameSite: 'none',
    // secure: true, 
    maxAge: 2 * 60 * 60 * 1000    // 2 hour
  }, 
  store: MongoStore.create({
    clientPromise: clientPromise,
    // ttl: 7 * 24 * 60 * 60, // 7 days
    autoRemove: 'native'
  })
}));

// Configure Middleware
app.use(cors({
  origin: `${CLIENT_URL}`,
  credentials: true  // allow session cookie from browser to pass through
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
require('./config/passportLocal.config')(passport);

// Passport Google Strategy
require('./config/passportGoogle.config')(passport);

// Passport Facebook Strategy
require('./config/passportFacebook.config')(passport);

// Passport Twitter Strategy
require('./config/passportTwitter.config')(passport);

// Passport GitHub Strategy
require('./config/passportGitHub.config')(passport);


// configure routes
app.use('/api/users', users);
app.use('/', login);
app.use('/', logout);
app.use('/', register);
app.use('/api/tasks', tasks);
app.use('/auth', checkLogin);
app.use('/auth', googleAuth);
app.use('/auth', facebookAuth);
app.use('/auth', twitterAuth);
app.use('/auth', githubAuth);
app.use((req, res, next) => {res.status(404).json({error: "No page found!"})});

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3005;
}

app.listen(port, () => {
	console.log("Server running on port " + port + ".");
});

