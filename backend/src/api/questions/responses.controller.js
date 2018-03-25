const Response = require('./responses.model');
const Question = require('./questions.model');
// const socketServer = require('../../config/sockets');

module.exports = {};

module.exports.getResponses = (req, res) => {
  Question.findById(
    req.params.id,
    (err, question) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!question) {
        return res.status(404).json({
          code: 'QUESTION_NOT_FOUND',
        });
      }
      return res.status(200).json(question.responses);
    },
  );
};

module.exports.create = (req, res) => {
  const response = new Response({ ...req.body, user: req.user.id });

  Question.update(
    { _id: req.params.id },
    { $push: { responses: response } },
    { runValidators: true },
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(response);
    },
  );
};
