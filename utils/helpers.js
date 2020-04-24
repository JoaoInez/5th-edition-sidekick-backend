exports.isAuthenticated = (f) => (req, res, next) => {
  if (req.isAuthenticated()) {
    const { user } = req;
    return f(user, req, res, next);
  }
  return next(401);
};
