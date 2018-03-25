const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
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

module.exports.ResponseSchema = ResponseSchema;
