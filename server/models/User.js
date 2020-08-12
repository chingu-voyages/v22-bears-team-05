const { model, Schema } = require("mongoose")

const userSchema = new Schema({
  email: String,
  password: String,
  createdDate: String,
})

module.exports = model("User", userSchema)
