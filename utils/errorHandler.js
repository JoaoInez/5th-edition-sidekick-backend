const R = require("ramda");

const ERRORS = {
  500: "INTERNAL_SERVER_ERROR",
  401: "NOT_AUTHENTICATED",
  404: "RESOURCE_NOT_FOUND",
  400: "BAD_REQUEST",
};

exports.reject = (status) => new Promise((_, reject) => reject(status));

exports.errorHandler = (err, req, res, next) => {
  const status = R.has(err)(ERRORS) ? err : 500;
  res.status(status).send({ error: ERRORS[status] });
};
