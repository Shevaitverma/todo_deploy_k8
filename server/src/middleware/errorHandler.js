const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} - ${err.message}`);
  console.error(`[ERROR] Stack trace:`, err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    console.error(`[ERROR] Validation errors:`, errors);
    return res.status(400).json({
      message: 'Validation Error',
      errors
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    console.error(`[ERROR] Invalid ObjectId: ${err.value}`);
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }

  // Default error
  console.error(`[ERROR] Unhandled error: ${err.message}`);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
};

module.exports = errorHandler; 