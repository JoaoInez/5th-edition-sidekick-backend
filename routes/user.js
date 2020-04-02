const router = require("express").Router();
const { createCharacter, getCharacters } = require("../controllers/user");

router.post("/character", createCharacter);
router.get("/character", getCharacters);

module.exports = router;
