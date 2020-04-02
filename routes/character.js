const router = require("express").Router();
const {
  getCharacter,
  updateCharacter,
  deleteCharacter
} = require("../controllers/character");

router.get("/:id", getCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

module.exports = router;
