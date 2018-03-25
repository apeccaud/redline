const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answer: {
    type: String,
    enum: ['goodAnswer', 'badAnswer1', 'badAnswer2', 'badAnswer3'],
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Response', ResponseSchema);
