const { notAuthenticatedError } = require("./errors");

exports.isAuthenticated = f => (req, res) => {
  if (req.isAuthenticated()) {
    const { user } = req;
    f({ req, res, user });
  } else {
    notAuthenticatedError(res);
  }
};
