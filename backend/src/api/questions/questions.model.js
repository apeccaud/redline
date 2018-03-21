const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  goodAnswer: {
    type: String,
    required: true,
  },
  badAnswer1: {
    type: String,
    required: true,
  },
  badAnswer2: {
    type: String,
    required: true,
  },
  badAnswer3: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Question', QuestionSchema);
