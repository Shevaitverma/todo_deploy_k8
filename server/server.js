require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 TODO APP SERVER STARTED');
  console.log('='.repeat(60));
  console.log(`📡 Server running on port: ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
  console.log(`📝 Todo API: http://localhost:${PORT}/api/todos`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 API Info: http://localhost:${PORT}/`);
  console.log('='.repeat(60));
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('='.repeat(60));
}); 