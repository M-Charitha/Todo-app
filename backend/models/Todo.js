const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Backend expects `text`, but frontend is sending `title`
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
