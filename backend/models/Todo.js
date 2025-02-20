const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, default: null },  // Optional due date
});

// Create the model from the schema
const Todo = mongoose.model('Todo', todoSchema);

// Export the Todo model
module.exports = Todo;
