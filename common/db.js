require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = process.env.DB_NAME;

async function connectToDatabase() {
  try {
    // Connect to MongoDB with Mongoose
    await mongoose.connect(dbURI);

    console.log('Connected successfully to MongoDB with Mongoose');

    // Listen for connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connection is open');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection is disconnected');
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed due to app termination');
      process.exit(0);
    });

    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB with Mongoose:', error.message);
    throw error;
  }
}

module.exports = { connectToDatabase };
