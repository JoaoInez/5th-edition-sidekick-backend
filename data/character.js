const User = require("../models/user");
const { reject } = require("../utils/errors");

const omitId = (doc, ret, options) => {
  delete ret._id;
  return ret;
};

exports.findCharacterById = (user, id) => {
  const character = user.characters.id(id);
  return character
    ? character.toObject({
        transform: omitId
      })
    : character;
};

exports.updateCharacter = (userId, id, character) =>
  User.findOneAndUpdate(
    { _id: userId, "characters._id": id },
    {
      $set: {
        "characters.$": { ...character, _id: id }
      }
    },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then(user =>
      user.characters.id(id).toObject({
        transform: omitId
      })
    )
    .catch(err => reject(null, err));

exports.deleteCharacter = (user, id) => {
  const character = user.characters.id(id);

  if (!character) {
    return reject(null, { error: "INTERNAl_SERVER_ERROR" });
  }
  character.remove();
  return user.save();
};
