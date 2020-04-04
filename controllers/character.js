const R = require("ramda");
const {
  findCharacterById,
  updateCharacter,
  deleteCharacter
} = require("../data/character");
const { isAuthenticated } = require("../utils/helpers");

exports.getCharacter = isAuthenticated((user, req, res, next) => {
  const id = R.path(["params", "id"])(req);
  const character = findCharacterById(user, id);

  if (!character) {
    return next(400);
  }
  res.send(character);
});

exports.updateCharacter = isAuthenticated((user, req, res, next) => {
  const { body: character, params } = R.pickAll(["body", "params"])(req);

  if (!character || R.isEmpty(character)) {
    return next(400);
  }

  const { id } = params;

  updateCharacter(user.id, id, character)
    .then(character => {
      res.send(character);
    })
    .catch(next);
});

exports.deleteCharacter = isAuthenticated((user, req, res) => {
  const id = R.path(["params", "id"])(req);

  deleteCharacter(user, id)
    .then(() => res.status(204).send())
    .catch(next);
});
