const { model, Schema } = require("mongoose");

const goalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "A goal must have a name."],
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  tags: [{
    type: String,
    minlength: 1,
    maxlength: 35,
    trim: true,
  }],
  totalTimeInSeconds: {
    type: Number,
    default: 0,
  },
  totalCompletedSubtasks: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Goal", goalSchema);
