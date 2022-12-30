const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String
  },
  created_date: {
    type: Date
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  labels: []
});

module.exports.TasksSchema = TasksSchema;
module.exports.Task = mongoose.model('Task', TasksSchema);
