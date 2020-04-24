const router = require("express").Router();
const {
  createCharacter,
  getCharacters,
  getCurrentUser,
} = require("../controllers/user");

router.post("/character", createCharacter);
router.get("/character", getCharacters);
router.get("/", getCurrentUser);

module.exports = router;
