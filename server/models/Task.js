const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "A task must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
  subTasks: [
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
});

module.exports = model("Task", taskSchema);
