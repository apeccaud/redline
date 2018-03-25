const Response = require('./responses.model');
// const socketServer = require('../../config/sockets');

module.exports = {};

module.exports.getResponses = (req, res) => {
  Response.find(
    { question: req.params.id },
    (err, responses) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(responses);
    },
  );
};

module.exports.create = (req, res) => {
  const response = new Response({ ...req.body, user: req.user.id, question: req.params.id });
  // Remove previous answers from the user and add new one
  Response
    .remove({ question: req.params.id, user: req.user })
    .then(() => {
      response.save((err) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json(response);
      });
    })
    .catch(err => res.status(500).json(err));
};
