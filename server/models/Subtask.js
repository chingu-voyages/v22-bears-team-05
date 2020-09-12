const { model, Schema } = require("mongoose");

const subtaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "An action item must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 30,
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
  tags: [{
    type: String,
    minlength: 1,
    maxlength: 35,
    trim: true,
  }],
  timeStarted: Number,
  timeCompleted: Number,
  totalTimeInSeconds: {
    type: Number,
    default: 0,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    default: null,
  },
});

module.exports = model("Subtask", subtaskSchema);
