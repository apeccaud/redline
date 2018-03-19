const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../api/users/users.model');

const getOrCreateUser = async linkappUser => new Promise((resolve, reject) => {
  User.findOne(
    { linkappUsername: linkappUser.username },
    (err, user) => {
      if (err) reject(err);
      if (user) resolve(user);
      // Create and save user
      const newUser = new User({
        name: linkappUser.nom,
        role: linkappUser.role === 'etudiant' ? 'student' : 'teacher',
        linkappUsername: linkappUser.username,
      });
      newUser.save((errSave) => {
        if (errSave) reject(errSave);
        resolve(newUser);
      });
    },
  );
});

module.exports.isAuthenticated = (req, res, next) => {
  // TODO : Check token validity in Linkapp
  if (!req.user) return res.status(401).json({ authUrl: config.authUrl });
  return next();
};

module.exports.initialize = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader) return next();

  const parsedJTW = authHeader.split(' ')[1];
  const linkappUser = jwt.decode(parsedJTW);

  return getOrCreateUser(linkappUser)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};
