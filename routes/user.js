const router = require("express").Router();
const { createCharacter, getUserCharacters } = require("../controllers/user");

router.post("/character", createCharacter);
router.get("/character", getUserCharacters);

module.exports = router;
