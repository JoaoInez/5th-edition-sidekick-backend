const R = require("ramda");
const { notAuthenticatedErrorHandler } = require("./errors");

exports.createCharacter = (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req;
    user.characters.push({});
    user.save();
    return res.status(201).send(R.last(user.characters));
  } else {
    return notAuthenticatedErrorHandler(res);
  }
};

exports.getUserCharacters = (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req;
    const characters = user.characters.map(char => char.id);
    res.send(characters);
  } else {
    return notAuthenticatedErrorHandler(res);
  }
};
