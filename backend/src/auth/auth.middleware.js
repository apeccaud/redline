const config = require('../config');

const isAuthenticated = (req, res, next) => {
  console.log('Authenticate');
  console.log(config.authUrl);
  // Get user token in request
  // Check validity of token in linkapp
  return next();
};

module.exports = isAuthenticated;
