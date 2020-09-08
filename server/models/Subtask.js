const { model, Schema } = require("mongoose");

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
