const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Logging middleware for this route
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// GET all todos
router.get('/', async (req, res) => {
  try {
    console.log('[GET /todos] Fetching all todos...');
    const todos = await Todo.find().sort({ createdAt: -1 });
    console.log(`[GET /todos] Successfully fetched ${todos.length} todos`);
    res.json(todos);
  } catch (error) {
    console.error('[GET /todos] Error:', error.message);
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
});

// GET single todo by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`[GET /todos/${req.params.id}] Fetching todo...`);
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      console.log(`[GET /todos/${req.params.id}] Todo not found`);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log(`[GET /todos/${req.params.id}] Successfully fetched todo: "${todo.title}"`);
    res.json(todo);
  } catch (error) {
    console.error(`[GET /todos/${req.params.id}] Error:`, error.message);
    res.status(500).json({ message: 'Error fetching todo', error: error.message });
  }
});

// POST create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    console.log('[POST /todos] Creating new todo:', { title, description, priority });
    
    if (!title) {
      console.log('[POST /todos] Validation failed: Title is required');
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
      title,
      description,
      priority
    });

    const savedTodo = await todo.save();
    console.log(`[POST /todos] Successfully created todo: "${savedTodo.title}" (ID: ${savedTodo._id})`);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('[POST /todos] Error:', error.message);
    res.status(400).json({ message: 'Error creating todo', error: error.message });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;
    console.log(`[PUT /todos/${req.params.id}] Updating todo:`, { title, description, completed, priority });
    
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      console.log(`[PUT /todos/${req.params.id}] Todo not found`);
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;

    const updatedTodo = await todo.save();
    console.log(`[PUT /todos/${req.params.id}] Successfully updated todo: "${updatedTodo.title}"`);
    res.json(updatedTodo);
  } catch (error) {
    console.error(`[PUT /todos/${req.params.id}] Error:`, error.message);
    res.status(400).json({ message: 'Error updating todo', error: error.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    console.log(`[DELETE /todos/${req.params.id}] Deleting todo...`);
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      console.log(`[DELETE /todos/${req.params.id}] Todo not found`);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log(`[DELETE /todos/${req.params.id}] Successfully deleted todo: "${todo.title}"`);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(`[DELETE /todos/${req.params.id}] Error:`, error.message);
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
});

// PATCH toggle todo completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    console.log(`[PATCH /todos/${req.params.id}/toggle] Toggling todo completion...`);
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      console.log(`[PATCH /todos/${req.params.id}/toggle] Todo not found`);
      return res.status(404).json({ message: 'Todo not found' });
    }

    const wasCompleted = todo.completed;
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    console.log(`[PATCH /todos/${req.params.id}/toggle] Successfully toggled todo: "${updatedTodo.title}" (${wasCompleted ? 'uncompleted' : 'completed'})`);
    res.json(updatedTodo);
  } catch (error) {
    console.error(`[PATCH /todos/${req.params.id}/toggle] Error:`, error.message);
    res.status(500).json({ message: 'Error toggling todo', error: error.message });
  }
});

module.exports = router; 