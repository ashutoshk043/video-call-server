const redis = require('redis');

// Create and initialize the Redis client
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: '',  // If you have a password
  db: 0
});

// Handle Redis connection
client.on('connect', () => {
  console.log('Connected to Redis');
});

// Handle Redis error
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Ensure the client is connected before using it
client.connect().catch(err => {
  console.error('Error connecting to Redis:', err);
});

module.exports = { client };
