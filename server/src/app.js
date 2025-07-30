const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('[HEALTH] Health check requested');
  res.json({ message: 'Todo API is running', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('[ROOT] API info requested');
  res.json({ 
    message: 'Welcome to Todo API',
    endpoints: {
      health: 'GET /health',
      todos: 'GET /api/todos',
      createTodo: 'POST /api/todos',
      getTodo: 'GET /api/todos/:id',
      updateTodo: 'PUT /api/todos/:id',
      deleteTodo: 'DELETE /api/todos/:id',
      toggleTodo: 'PATCH /api/todos/:id/toggle'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  console.log(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app; 