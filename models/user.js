const mongoose = require("mongoose");
const characterSchema = require("./character");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  characters: [characterSchema]
});

module.exports = mongoose.model("User", userSchema);
