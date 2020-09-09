const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "A task must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  subtasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subtask",
    },
  ],
  totalTimeInSeconds: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Goal",
    default: null,
  },
  totalCompletedSubtasks: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Task", taskSchema);
