const Question = require('./questions.model');
const socketServer = require('../../config/sockets');

module.exports = {};

module.exports.findAll = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(questions);
  });
};

module.exports.create = (req, res) => {
  const question = new Question(req.body);

  question.save((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    socketServer.emit('QUESTIONS_CHANGED');
    return res.status(201).json(question);
  });
};

module.exports.findLastActive = (req, res) => {
  // Find last question
  // If this question is active return it, else return null
  Question.find({}).sort('-createdAt').limit(1).exec((err, questions) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (questions.length === 0) {
      return res.status(200).send(null);
    }
    if (!questions[0].isActive) {
      return res.status(200).send(null);
    }
    return res.status(200).json(questions[0]);
  });
};

module.exports.deactivate = (req, res) => {
  Question.update(
    { _id: req.params.id },
    {
      $set: {
        isActive: false,
      },
    },
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      socketServer.emit('QUESTIONS_CHANGED');
      return res.status(200).json('Success');
    },
  );
};
