const R = require("ramda");

exports.getCharacter = (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req;
    const characterId = R.path(["params", "id"])(req);
    const character = user.characters.id(characterId);
    return res.send(character);
  } else {
    return notAuthenticatedErrorHandler(res);
  }
};
