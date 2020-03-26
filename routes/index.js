const router = require("express").Router();
const site = require("./site");
const auth = require("./auth");
const users = require("./users");

router.use("/", site);
router.use("/", auth);
router.use("/users", users);

module.exports = router;
