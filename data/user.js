const User = require("../models/user");

exports.findUserByEmail = (email) => User.findOne({ email }).exec();

exports.findUserById = (id) => User.findById(id).exec();

exports.createUser = (email, password, username) => {
  const user = new User({ email, password, username });
  return user.save();
};

exports.createCharacter = (user) => {
  user.characters.push({});
  return user.save();
};

exports.getCharactersIds = (user) =>
  user.characters.map((char) => char.publicId);
