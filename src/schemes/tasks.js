const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description:String,
    resume:String,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  const taskModel = mongoose.model("Task", taskSchema);
  
  module.exports = taskModel;