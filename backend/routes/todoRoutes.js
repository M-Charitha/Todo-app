const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a Todo
router.post('/todos', async (req, res) => {
  try {
      const { text, priority = "medium" } = req.body; // Ensure priority is handled properly
      const newTodo = new Todo({ text, priority });
      await newTodo.save();
      res.status(201).json(newTodo);
  } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: error.message });
  }
});

// Get Todos
router.get('/todos', async (req, res) => {
  try {
      const todos = await Todo.find();
      res.json(todos);
  } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: error.message });
  }
});

// Update a Todo
router.put('/todos/:id', async (req, res) => {
  try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTodo) {
          return res.status(404).json({ message: "Todo not found" });
      }
      res.json(updatedTodo);
  } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id || id.length !== 24) { // Ensure it's a valid MongoDB ObjectId
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
