const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  smallRewards: {
    type: [String],
    default: ["Take a 5 minute break!"],
  },
  mediumRewards: {
    type: [String],
    default: ["Take an hour long break!"],
  },
  largeRewards: {
    type: [String],
    default: ["Take a day off!"],
  },
  tags: {
    type: [{ tagName: String, time: Number }],
  },
});

module.exports = model("User", userSchema);
