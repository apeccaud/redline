const jwt = require('jsonwebtoken');
const request = require('superagent');

const config = require('../config');
const User = require('../api/users/users.model');

const getOrCreateUser = async linkappUser => new Promise((resolve, reject) => {
  User.findOne(
    { linkappUsername: linkappUser.username },
    (err, user) => {
      if (err) reject(err);
      if (user) resolve(user);
      // Create and save user
      const newUser = new User({
        firstname: linkappUser.prenom,
        lastname: linkappUser.nom,
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

const getUpdatedToken = async authHeader => new Promise((resolve, reject) => {
  const checkTokenUrl = `${config.authUrl}/api/checkandrefreshtoken`;
  return request.get(checkTokenUrl)
    .set('Authorization', authHeader)
    .then(res => resolve(res.body.newToken))
    .catch(err => reject(err));
});

module.exports.isAuthenticated = (req, res, next) => {
  if (!req.user) return res.status(401).json({ authUrl: config.authUrl });
  return next();
};

module.exports.initialize = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader) return next();
  try {
    const token = await getUpdatedToken(authHeader);
    const parsedJTW = token.split(' ')[1];
    const linkappUser = jwt.decode(parsedJTW);
    req.user = await getOrCreateUser(linkappUser);
    return next();
  } catch (e) {
    console.error(e);
    req.user = {};
    return next();
  }
};
