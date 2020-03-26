const User = require("../models/user");

exports.findUserByEmail = email => User.findOne({ email }).exec();

exports.findUserById = id => User.findById(id).exec();

exports.createUser = (email, password) => {
  const user = new User({ email, password });
  return user.save();
};
