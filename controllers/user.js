const R = require("ramda");
const { createCharacter, getCharactersIds } = require("../data/user");
const { isAuthenticated } = require("../utils/helpers");

exports.createCharacter = isAuthenticated((user, _, res, next) => {
  createCharacter(user)
    .then(() => res.status(201).send(R.last(user.characters)))
    .catch(next);
});

exports.getCharacters = isAuthenticated((user, _, res) => {
  const characters = getCharactersIds(user);
  res.send(characters);
});

exports.getCurrentUser = isAuthenticated((user, _, res) => {
  const userData = R.pick(["username", "darkMode"])(user);
  res.send(userData);
});
