const config = require('../config');

const isAuthenticated = (req, res, next) => {
  // TODO : Check token validity in Linkapp
  if (!req.user) return res.status(401).send({ authUrl: config.authUrl });
  return next();
};

module.exports = isAuthenticated;
