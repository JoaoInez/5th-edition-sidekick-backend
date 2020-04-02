const R = require("ramda");

exports.reject = (status, error) =>
  new Promise((_, reject) =>
    status ? reject({ status, error }) : reject(error)
  );

const pickError = R.pickAll(["status", "error"]);

exports.error = res => err =>
  res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });

exports.notAuthenticatedError = res =>
  res.status(401).send({ error: "NOT_AUTHENTICATED" });

exports.notFoundError = res =>
  res.status(404).send({ error: "RESOURCE_NOT_FOUND" });

exports.badRequestError = res => res.status(400).send({ error: "BAD_REQUEST" });

exports.authError = (res, next) => err => {
  const { status, error } = pickError(err);

  if (status && error) {
    return res.status(status).send(error);
  }
  return next(err);
};

exports.passportError = done => err => {
  const info = pickError(err);

  if (info) {
    return done(null, false, info);
  }
  return done(err);
};
