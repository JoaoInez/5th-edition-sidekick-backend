const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { findUserByEmail, findUserById } = require("./data/user");
const { reject } = require("./utils/errorHandler");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    findUserByEmail(email)
      .then((user) => {
        if (!user) return reject(400);
        return Promise.all([user, bcrypt.compare(password, user.password)]);
      })
      .then(([user, result]) => {
        if (!result) return done(null, false, { message: 400 });
        return done(null, user);
      })
      .catch((err) => {
        if (err === 400) return done(null, false, { message: err });
        done(err);
      });
  })
);

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) => {
  findUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports = passport;
