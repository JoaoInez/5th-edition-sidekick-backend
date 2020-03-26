const R = require("ramda");

exports.reject = (status, error) =>
  new Promise((_, reject) => reject({ status, error }));

const pickError = R.pickAll(["status", "error"]);

exports.errorHandler = (res, next) => err => {
  const { status, error } = pickError(err);

  if (status && error) {
    return res.status(status).send(error);
  }
  return next(err);
};

exports.passportErrorhandler = done => err => {
  const info = pickError(err);

  if (info) {
    return done(null, false, info);
  }
  return done(err);
};
