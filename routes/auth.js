const router = require("express").Router();
const { login, signup, logout } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
