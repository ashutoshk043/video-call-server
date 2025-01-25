require('dotenv').config()
const redis = require('redis');

// Create and initialize the Redis client
const client = redis.createClient({
  host: 'localhost',
  port: process.env.REDIS_PORT,
  password: '', // Add the password if required
  db: 0,        // Select the Redis database
});



// Handle Redis events
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Export the Redis client without connecting
module.exports = { client };
