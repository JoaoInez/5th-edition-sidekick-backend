const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { findUserByEmail, findUserById } = require("./data/user");
const { reject, passportError } = require("./utils/errors");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const invalidCredentials = {
      status: 400,
      error: "INVALID_CREDENTIALS"
    };

    findUserByEmail(email)
      .then(user => {
        if (!user) {
          return reject(...Object.values(invalidCredentials));
        }

        return Promise.all([user, bcrypt.compare(password, user.password)]);
      })
      .then(([user, result]) => {
        if (!result) {
          return done(null, false, invalidCredentials);
        }

        return done(null, user);
      })
      .catch(passportError(done));
  })
);

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) => {
  findUserById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

module.exports = passport;
