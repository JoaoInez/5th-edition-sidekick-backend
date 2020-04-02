const R = require("ramda");
const { createCharacter, getCharactersIds } = require("../data/user");
const { isAuthenticated } = require("../utils/helpers");
const { error } = require("../utils/errors");

exports.createCharacter = isAuthenticated(({ res, user }) => {
  createCharacter(user).catch(error(res));
  res.status(201).send(R.last(user.characters));
});

exports.getCharacters = isAuthenticated(({ res, user }) => {
  const characters = getCharactersIds(user);
  res.send(characters);
});
