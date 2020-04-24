const passport = require("passport");
const bcrypt = require("bcrypt");
const R = require("ramda");
const { createUser, findUserByEmail } = require("../data/user");
const { reject } = require("../utils/errorHandler");

exports.signup = (req, res, next) => {
  const { email, password, username } = R.compose(
    R.pickAll(["username", "email", "password"]),
    R.prop("body")
  )(req);

  if (!email || !password || !username) {
    return next(400);
  }

  findUserByEmail(email)
    .then((user) => {
      if (user) {
        return reject(400);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => createUser(email, hashedPassword, username))
    .then((user) => {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).send();
      });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user || info) {
      return next(400);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(204).send();
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.status(204).send();
};
