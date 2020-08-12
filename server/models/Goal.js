const { model, Schema } = require("mongoose");

const goalSchema = new Schema({
  name: {
    type: String,
    required: [true, "A goal must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
  tasks: [taskSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "A task must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
  subTasks: [subtaskSchema],
  totalTime: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const subtaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "A subtask must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  timeStarted: Date,
  timeCompleted: Date,
  totalTime: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Goal", goalSchema);
