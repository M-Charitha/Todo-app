const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a Todo
router.post('/todos', async (req, res) => {
  try {
      const newTodo = new Todo({ text: req.body.text });
      await newTodo.save();
      res.status(201).json(newTodo);  // Send response back
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get Todos
router.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update a Todo
router.put('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

// Delete a Todo
router.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo Deleted' });
});

module.exports = router;