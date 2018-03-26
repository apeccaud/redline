const User = require('./users.model');
const socketServer = require('../../config/sockets');

module.exports = {};

module.exports.findAll = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(e => res.status(500).json(e));
};

module.exports.findOne = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json(e));
};

module.exports.getStatus = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user.status))
    .catch(e => res.status(500).json(e));
};

module.exports.create = (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => res.status(201).json(user))
    .catch(e => res.status(500).json(e));
};

module.exports.changeStatus = (req, res) => {
  User.update(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
    { runValidators: true },
  )
    .then(() => {
      // Emit socket to notify that status changed
      socketServer.emit('STATUS_CHANGED');
      return res.status(204).end();
    })
    .catch(e => res.status(500).json(e));
};

module.exports.getAllStatus = (req, res) => {
  User.find({})
    .then((users) => {
      const allStatus = users.map(u => u.status);
      return res.status(200).json(allStatus);
    })
    .catch(e => res.status(500).json(e));
};

module.exports.resetAllStatus = (req, res) => {
  User.update(
    {},
    { $set: { status: 'neutral' } },
    { multi: true },
  )
    .then(() => {
      // Emit socket to notify that status changed
      socketServer.emit('STATUS_CHANGED');
      return res.status(204).end();
    })
    .catch(e => res.status(500).json(e));
};

module.exports.getUser = (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  }
  return res.status(500).send('No user');
};
