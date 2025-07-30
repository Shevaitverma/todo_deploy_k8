const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
    console.log(`[DATABASE] Attempting to connect to MongoDB...`);
    console.log(`[DATABASE] URI: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials
    
    await mongoose.connect(mongoURI);
    console.log('[DATABASE] ✅ MongoDB connected successfully');
  } catch (error) {
    console.error('[DATABASE] ❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 