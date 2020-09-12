const { model, Schema } = require("mongoose")

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "A task must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 20,
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
  tags: [{
    type: String,
    minlength: 1,
    maxlength: 35,
    trim: true,
  }],
  totalCompletedSubtasks: {
    type: Number,
    default: 0,
  },
})

module.exports = model("Task", taskSchema)
