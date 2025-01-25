require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectToDatabase } = require('./common/db');
const { client } = require('./common/redish');
const { createSocketServer } = require('./common/socket');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database and handle errors
connectToDatabase()

// Connect to Redis and handle errors
client.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Error connecting to Redis:', err));

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = createSocketServer(server); // Ensure this function properly sets up `io`

// Use routes
app.use('/api/', routes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).send({ status: true, message: "Welcome !!" });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).send({ status: false, message: "Invalid API" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send({ status: false, message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
