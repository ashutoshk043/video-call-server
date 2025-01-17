const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectToDatabase } = require('./common/db');
const { client } = require('./common/redish');
const app = express();
app.use(cors());
const server = http.createServer(app);
const { createSocketServer } = require('./common/socket');

// Connect to the database and Redis once when the server starts
connectToDatabase();

client.connect().then(() => {
  console.log('Connected to Redis');
}).catch(err => console.error('Error connecting to Redis:', err));

const io = createSocketServer(server);


const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
