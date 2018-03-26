const Question = require('./questions.model');
const socketServer = require('../../config/sockets');

module.exports = {};

module.exports.findAll = (req, res) => {
  Question.find({})
    .then(questions => res.status(200).json(questions))
    .catch(e => res.status(500).json(e));
};

module.exports.create = (req, res) => {
  const question = new Question(req.body);
  question.save()
    .then(() => {
      socketServer.emit('QUESTIONS_CHANGED');
      return res.status(201).json(question);
    })
    .catch(e => res.status(500).json(e));
};

module.exports.findLastActive = (req, res) => {
  // Find last question
  // If this question is active return it, else return null
  Question.find({})
    .sort('-createdAt')
    .limit(1)
    .then((questions) => {
      if (questions.length === 0) {
        return res.status(200).send(null);
      }
      if (!questions[0].isActive) {
        return res.status(200).send(null);
      }
      return res.status(200).json(questions[0]);
    })
    .catch(e => res.status(500).json(e));
};

module.exports.deactivate = (req, res) => {
  Question.update(
    { _id: req.params.id },
    { $set: { isActive: false } },
  )
    .then(() => {
      socketServer.emit('QUESTIONS_CHANGED');
      return res.status(200).json('Success');
    })
    .catch(e => res.status(500).json(e));
};
