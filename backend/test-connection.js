const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB connection...');
console.log('📡 Connection URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/zohahome');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zohahome')
.then(() => {
  console.log('✅ MongoDB connection successful!');
  console.log('🎉 Your database is ready to use');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:');
  console.error('Error:', err.message);
  console.log('\n💡 Solutions:');
  console.log('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
  console.log('2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
  console.log('3. Make sure MongoDB service is running');
  process.exit(1);
}); 