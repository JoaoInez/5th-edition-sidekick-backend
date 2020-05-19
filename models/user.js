const mongoose = require("mongoose");
const characterSchema = require("./character");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  characters: [characterSchema],
  theme: { type: String, default: "light" },
});

module.exports = mongoose.model("User", userSchema);
