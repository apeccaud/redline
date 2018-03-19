const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../api/users/users.model');

const getOrCreateUser = async (linkappUser) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      { linkappUsername: linkappUser.username },
      (err, user) => {
        if (err) reject(err);
        if (user) resolve(user);
        // Create and save user
        // TODO fix workaround : get role from role
        // const newUser = new User({
        //   name: linkappUser.nom,
        //   role: linkappUser.role === 'etudiant' ? 'student' : 'teacher',
        //   linkappUsername: linkappUser.username,
        // });
        const newUser = new User({
          name: linkappUser.nom,
          role: linkappUser.username === 'student' ? 'student' : 'teacher',
          linkappUsername: linkappUser.username,
        });
        return newUser.save((errSave) => {
          console.log('save user');
          if (errSave) reject(errSave);
          return resolve(newUser);
        });
      },
    );
  });
};

module.exports.isAuthenticated = (req, res, next) => {
  // TODO : Check token validity in Linkapp
  if (!req.user) return res.status(401).json({ authUrl: config.authUrl });
  return next();
};

module.exports.initialize = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  const parsedJTW = authHeader.split(' ')[1];
  const linkappUser = jwt.decode(parsedJTW);

  getOrCreateUser(linkappUser)
    .then((user) => {
      req.user = user;
      console.log('Il la fait');
      console.log(req.user);
      return next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });

  // return next();
};

// const getOrCreateFromJWT = (jwt) => {
//   // Decode JWT
//   const parsedJTW = req.params.jwt.split(' ')[1];
//   const linkappUser = jwt.decode(parsedJTW);
//   // Find or create user
//   User.findOne(
//     { linkappUsername: linkappUser.username },
//     (err, user) => {
//       if (err) return res.status(500).json(err);
//       if (user) {
//         // User already exists
//         return res.status(200).json(user);
//       }
//       // Create and save user
//       // TODO fix workaround : get role from role
//       // const newUser = new User({
//       //   name: linkappUser.nom,
//       //   role: linkappUser.role === 'etudiant' ? 'student' : 'teacher',
//       //   linkappUsername: linkappUser.username,
//       // });
//       const newUser = new User({
//         name: linkappUser.nom,
//         role: linkappUser.username === 'student' ? 'student' : 'teacher',
//         linkappUsername: linkappUser.username,
//       });
//       return newUser.save((errSave) => {
//         console.log('save user');
//         if (err) return res.status(500).json(errSave);
//         return res.status(201).json(newUser);
//       });
//     },
//   );
// };
