const R = require("ramda");
const Hashids = require("hashids");
require("dotenv").config();
const hashids = new Hashids(process.env.HASHIDS_SALT);
const {
  findCharacterById,
  updateCharacter,
  deleteCharacter,
} = require("../data/character");
const { isAuthenticated } = require("../utils/helpers");

exports.getCharacter = isAuthenticated((user, req, res, next) => {
  const publicId = R.path(["params", "id"])(req);
  const id = hashids.decodeHex(publicId);
  const character = findCharacterById(user, id);

  if (!character) return next(404);
  res.send(character);
});

exports.updateCharacter = isAuthenticated((user, req, res, next) => {
  const { body: character, params } = R.pickAll(["body", "params"])(req);

  if (!character || R.isEmpty(character)) return next(400);

  const publicId = R.prop("id")(params);
  const id = hashids.decodeHex(publicId);

  updateCharacter(user.id, id, character)
    .then((character) => res.send(character))
    .catch(next);
});

exports.deleteCharacter = isAuthenticated((user, req, res, next) => {
  const publicId = R.path(["params", "id"])(req);
  const id = hashids.decodeHex(publicId);

  deleteCharacter(user, id)
    .then(() => res.status(204).send())
    .catch(next);
});
