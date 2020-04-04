const User = require("../models/user");
const { reject } = require("../utils/errorHandler");

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
    .catch(reject);

exports.deleteCharacter = (user, id) => {
  const character = user.characters.id(id);

  if (!character) {
    return reject(500);
  }
  character.remove();
  return user.save();
};
