const mongoose = require("mongoose");
const characterSchema = require("./character");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  characters: [characterSchema],
  darkMode: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
