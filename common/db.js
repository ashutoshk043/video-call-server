const { MongoClient } = require('mongodb');

// Replace with your database name
const dbName = 'kyroscape';
const url = 'mongodb://127.0.0.1:27017'; // Local MongoDB URL
const client = new MongoClient(url);

async function connectToDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB');

    // Return the database instance
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it where this function is called
  }
}

module.exports = { connectToDatabase };
