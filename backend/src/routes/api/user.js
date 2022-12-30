// routes/api/user.js

require("dotenv").config();
const express = require('express');
const router = express.Router();

// Load Model
const User = require('../../models/User');
const Tasks = require('../../models/Task');

// import middleware
const authMiddleware = require('../../middleware/auth.middleware');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));

// @route GET api/users/tasks
// @description fetch all tasks from a user
// @access User
router.get('/tasks', authMiddleware.isLoggedIn(), (req, res) => {
  const {_id} = req.user;
  User.find({_id: _id}, (err, results) => {
    if (err) {
      console.log(err);
      res.json({error: err});
    } else {
      if (results) {
        res.json(results);
      } else {
        res.status(404).json("No User Found");
      }
    }
  });
});

// @route GET api/users/all
// @description fetch all users route
// @access Admin
router.get('/all', (req, res) => {
  const {ADMIN_KEY} = req.body;
  // You need to send an admin key in the body on this route
  if (process.env.ADMIN_KEY === ADMIN_KEY) {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({no_users_found: 'No Users Found'}));
  } else {
    res.status(401).json({err: "You do not have access to this route"})
  }
});

// @route GET api/users/:id
// @description fetch all users route
// @access User
router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  User.find({userId: id}, (err, results) => {
    if (err) {
      console.log(err);
      res.json({error: err});
    } else {
      if (results) {
        // console.log(results);
        res.json(results);
      } else {
        res.status(404).json("No User Found");
      }
    }
  });
});

// @route POST api/users/:id/tasks
// @description add a task to a user route
// @access User
router.post('/:id/tasks', async (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;

  const newTask = Tasks.Task({
    title: title,
    content: content,
    created_date: Date.now()
  });

  User.findOne({userId: id}, async (err, UsersList) => {
    UsersList.tasks.push(newTask);
    await UsersList.save();
    res.json({success: "Success"});
  });
});

// @route DELETE api/users/:id/tasks/:taskId
// @description delete a task from a user route
// @access User
router.delete('/:id/tasks/:taskId', async (req, res) => {
  const {id, taskId} = req.params;

  User.findOneAndUpdate(
      {userId: id},
      {$pull: {
        tasks: {
          _id: taskId
        }
      }}, 
      async (err, UsersList) => {
        if (!err) {
          console.log("Successfully Deleted the item.");
          res.json({success: "Successfully Deleted the task!"});
        } else {
          res.status(404).json({err: "Unable to delete the task."});
        }
      }
  );
});

// @route PUT api/users/:id/tasks/:taskId
// @description Update a task from a user route
// @access User
router.put ('/:id/tasks/:taskId', async (req, res) => {
  const {id, taskId} = req.params;
  const {title, content} = req.body;

  User.findOneAndUpdate(
    {userId: id, "tasks._id": taskId},
    {$set: {
      "tasks.$.title": title,
      "tasks.$.content": content,
      "tasks.$.updated_date": Date.now()
    }},
    {upsert: true},
    async (err) => {
      if (!err) {
        console.log("Successfully updated the task!");
        res.json({success: "Successfully Updated the task!"});
      } else {
        console.log(err);
        res.status(404).json({error: "Error in updating the task!"});
      }
    }
  );
});

module.exports = router;