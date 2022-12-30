// routes/api/tasks.js

require("dotenv").config();
const _ = require('lodash');
const express = require('express');
const router = express.Router();

// Load Model
const User = require('../../models/User');
const Tasks = require('../../models/Task');

// import middleware
const authMiddleware = require('../../middleware/auth.middleware');

// @route GET api/tasks/test
// @description tests tasks route
// @access Public
router.get('/test', (req, res) => res.send('tasks route testing!'));


// @route GET api/tasks/
// @description fetch all tasks from a user
// @access User
router.get('/', authMiddleware.isLoggedIn(), (req, res) => {
  const {_id} = req.user;
  User.findById({_id: _id}, (err, results) => {
    if (err) {
      console.log(err);
      res.json({error: err});
    } else {
      if (results) {
        let tasks = _.sortBy(results.tasks, 'updated_date');
        res.json(tasks);
      } else {
        res.status(404).json("No User Found");
      }
    }
  });
});

// @route POST api/tasks/
// @description add a task to a user
// @access User
router.post('/', authMiddleware.isLoggedIn(), async (req, res) => {
  const {_id} = req.user;
  const {title, content} = req.body;

  const newTask = Tasks.Task({
    title: title,
    content: content,
    created_date: Date.now()
  });

  User.findOne({_id: _id}, async (err, UsersList) => {
    UsersList.tasks.push(newTask);
    await UsersList.save();
    res.json({success: "Success"});
  });
});

// @route DELETE api/tasks/
// @description delete a task from a user
// @access User
router.delete('/', authMiddleware.isLoggedIn(), async (req, res) => {
  const {_id} = req.user;
  const {taskId} = req.body;
  User.findOneAndUpdate(
      {_id: _id},
      {$pull: {
        tasks: {
          _id: taskId
        }
      }}, 
      async (err, UsersList) => {
        if (!err) {
          console.log("Successfully Deleted the item.");
          res.json({
            success: "Successfully Deleted the task!",
            deleteStatus: true
          });
        } else {
          res.status(404).json({err: "Unable to delete the task."});
        }
      }
  );
});

// @route PUT api/tasks/
// @description Update a task from a user route
// @access User
router.put ('/',authMiddleware.isLoggedIn(), async (req, res) => {
  const {_id} = req.user;
  const {taskId, title, content} = req.body;

  User.findOneAndUpdate(
    {"_id": _id, "tasks._id": taskId},
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

