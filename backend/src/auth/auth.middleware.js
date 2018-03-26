const jwt = require('jsonwebtoken');
const request = require('superagent');

const config = require('../config');
const User = require('../api/users/users.model');


const createNewUserFromLinkapp = async (linkappUser) => {
  const user = new User({
    firstname: linkappUser.prenom,
    lastname: linkappUser.nom,
    role: linkappUser.role === 'etudiant' ? 'student' : 'teacher',
    linkappUsername: linkappUser.username,
  });
  await user.save();
  return user;
};

const getOrCreateUser = async (linkappUser) => {
  return await User.findOne({ linkappUsername: linkappUser.username })
    || createNewUserFromLinkapp(linkappUser);
};

const getUpdatedToken = (authHeader) => {
  const checkTokenUrl = `${config.authUrl}/api/checkandrefreshtoken`;
  return request.get(checkTokenUrl)
    .set('Authorization', authHeader)
    .then(res => res.body.newToken);
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ authUrl: config.authUrl });
};

module.exports.initialize = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader) {
    return next();
  }
  try {
    const token = await getUpdatedToken(authHeader);
    const parsedJTW = token.split(' ')[1];
    const linkappUser = jwt.decode(parsedJTW);
    req.user = await getOrCreateUser(linkappUser);
    return next();
  } catch (e) {
    console.error(e);
    req.user = null;
    return next();
  }
};
