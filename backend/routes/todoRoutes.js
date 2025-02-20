const express = require('express');
const Todo = require('../models/Todo');
const mongoose = require('mongoose');  // Import mongoose for ObjectId validation
const router = express.Router();

// Create a new Todo
router.post('/todos', async (req, res) => {
  try {
    const { text, priority, dueDate } = req.body;

    const newTodo = new Todo({
      text,
      priority,
      dueDate,
    });

    await newTodo.save();
    res.status(201).json(newTodo);  // Return the newly created todo
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all Todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);  // Send all todos to the frontend
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update a Todo by ID
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, priority, completed, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Todo ID format" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, priority, completed, dueDate },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);  // Return the updated todo
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a Todo by ID
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Todo ID format" });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Server error while deleting todo" });
  }
});

module.exports = router;
