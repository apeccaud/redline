const Response = require('./responses.model');
const socketServer = require('../../config/sockets');


module.exports.getResponses = (req, res) => {
  Response.find({ question: req.params.id })
    .then(responses => res.status(200).json(responses))
    .catch(e => res.status(500).json(e));
};

module.exports.create = (req, res) => {
  const response = new Response({ ...req.body, user: req.user.id, question: req.params.id });
  // Remove previous answers from the user and add new one
  Response
    .remove({ question: req.params.id, user: req.user })
    .then(() => response.save())
    .then(() => {
      socketServer.emit('RESPONSES_CHANGED', { question: req.params.id });
      return res.status(201).json(response);
    })
    .catch(e => res.status(500).json(e));
};
