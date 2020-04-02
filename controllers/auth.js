const passport = require("passport");
const bcrypt = require("bcrypt");
const R = require("ramda");
const { createUser, findUserByEmail } = require("../data/user");
const { reject, errorHandler } = require("./errors");

exports.signup = (req, res, next) => {
  const email = R.path(["body", "email"])(req);

  findUserByEmail(email)
    .then(user => {
      if (user) {
        return reject(400, "USER_ALREADY_EXISTS");
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then(hashedPassword => createUser(req.body.email, hashedPassword))
    .then(user => {
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        return res.status(201).send();
      });
    })
    .catch(errorHandler(res, next));
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info) {
      return errorHandler(res, next)(info);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return errorHandler({ status: 400, error: "INVALID_CREDENTIALS" });
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(204).send();
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  return res.status(204).send();
};
