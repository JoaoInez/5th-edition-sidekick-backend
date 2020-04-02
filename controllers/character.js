const R = require("ramda");
const {
  findCharacterById,
  updateCharacter,
  deleteCharacter
} = require("../data/character");
const { isAuthenticated } = require("../utils/helpers");
const { error, notFoundError, badRequestError } = require("../utils/errors");

exports.getCharacter = isAuthenticated(({ req, res, user }) => {
  const id = R.path(["params", "id"])(req);
  const character = findCharacterById(user, id);

  if (!character) {
    return notFoundError(res);
  }
  res.send(character);
});

exports.updateCharacter = isAuthenticated(({ req, res, user }) => {
  const { body: character, params } = R.pickAll(["body", "params"])(req);

  if (!character || R.isEmpty(character)) {
    return badRequestError(res);
  }

  const { id } = params;

  updateCharacter(user.id, id, character)
    .then(character => {
      res.send(character);
    })
    .catch(error(res));
});

exports.deleteCharacter = isAuthenticated(({ req, res, user }) => {
  const id = R.path(["params", "id"])(req);

  deleteCharacter(user, id)
    .then(() => res.status(204).send())
    .catch(error(res));
});
