const router = require("express").Router();
const site = require("./site");
const auth = require("./auth");
const user = require("./user");
const character = require("./character");

router.use("/", site);
router.use("/", auth);
router.use("/user", user);
router.use("/character", character);

module.exports = router;
