const User = require('./users.model');

module.exports = {};

module.exports.findAll = (req, res) => {
  User.find({}, (err, messages) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(messages);
  });
};

// module.exports.findOne = (req, res) => {
//   User.findOne(
//     { _id: req.params.id },
//     (err, user) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json(user);
//     },
//   );
// };
//
// module.exports.getStatus = (req, res) => {
//   User.findOne(
//     { _id: req.params.id },
//     (err, user) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json(user.status);
//     },
//   );
// };
//
// module.exports.create = (req, res) => {
//   const user = new User(req.body);
//   user.save((err) => {
//     if (err) return res.status(500).json(err);
//     return res.status(201).json(user);
//   });
// };
