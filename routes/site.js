const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("You hit the homepage");
});

router.get("/about", (req, res) => {
  res.send("You hit about");
});

router.get("/authrequired", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("you hit the authentication endpoint");
  } else {
    res.send("you are not authorized");
  }
});

module.exports = router;
