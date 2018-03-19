const User = require('./users.model');
const socketServer = require('../../config/sockets');
const jwt = require('jsonwebtoken');

module.exports = {};

module.exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(users);
  });
};

module.exports.findOne = (req, res) => {
  User.findOne(
    { _id: req.params.id },
    (err, user) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(user);
    },
  );
};

module.exports.getStatus = (req, res) => {
  User.findOne(
    { _id: req.params.id },
    (err, user) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(user.status);
    },
  );
};

module.exports.create = (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(user);
  });
};

module.exports.changeStatus = (req, res) => {
  User.update(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status,
      },
    },
    { runValidators: true },
    (err) => {
      if (err) return res.status(500).json(err);
      // Emit socket to notify that status changed
      socketServer.emit('STATUS_CHANGED');
      return res.status(200).json('Success');
    },
  );
};

module.exports.getAllStatus = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).json(err);
    const allStatus = users.map(u => u.status);
    return res.status(200).json(allStatus);
  });
};

module.exports.resetAllStatus = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).json(err);
    const status = users.map((u) => {
      u.set({ status: 'neutral' });
      u.save((err1) => {
        if (err1) return console.error(err1);
        return true;
      });
      return u.status;
    });
    // Emit socket to notify that status changed
    socketServer.emit('STATUS_CHANGED');
    return res.status(200).json(status);
  });
};

module.exports.getOrCreateFromJWT = (req, res) => {
  // Decode JWT
  const parsedJTW = req.params.jwt.split(' ')[1];
  const linkappUser = jwt.decode(parsedJTW);
  // Find or create user
  User.findOne(
    { linkappUsername: linkappUser.username },
    (err, user) => {
      if (err) return res.status(500).json(err);
      if (user) {
        // User already exists
        return res.status(200).json(user);
      }
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
        if (err) return res.status(500).json(errSave);
        return res.status(201).json(newUser);
      });
    },
  );
};

module.exports.getUser = (req, res) => {
  console.log('yooyoyoyo');
  if (!req.user) res.status(500).send('No user');
  return res.status(200).json(req.user);
};
