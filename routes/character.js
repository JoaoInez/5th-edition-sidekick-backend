const router = require("express").Router();
const { getCharacter } = require("../controllers/character");

router.get("/:id", getCharacter);

module.exports = router;
