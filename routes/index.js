const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");
const character = require("./character");

router.use("/", auth);
router.use("/user", user);
router.use("/character", character);

module.exports = router;
