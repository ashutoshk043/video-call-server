const { Server } = require('socket.io');
const { client } = require('./redish');

// Track the number of connected users
let connectedUser = 0;

// Function to update the connected user count in Redis
const updateRedisUserCount = async () => {
  try {
    // Update the user count in Redis
    await client.set('connect_user', connectedUser);
    // console.log('Updated connected user count in Redis:', connectedUser);
  } catch (err) {
    console.error('Error setting Redis user count:', err);
  }
};

// Function to create the Socket.IO server
const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200', // Frontend URL
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // Increment the connected user count
    connectedUser += 1;
    // console.log('A user connected:', socket.id);

    // Update Redis with the new user count
    updateRedisUserCount();

    // Optionally, retrieve the updated value from Redis
    client.get('connect_user', (err, reply) => {
      if (err) {
        console.error('Error getting Redis:', err);
      } else {
        // console.log('Current connected user count from Redis:', reply);
      }
    });

    // Handle message broadcasting
    socket.on('message', (data) => {
      console.log('Message:', data);
      socket.broadcast.emit('message-txfr', data);
    });

    socket.on('disconnect', () => {
      // Decrement the connected user count
      connectedUser -= 1;
    //   console.log('A user disconnected:', socket.id);

      // Update Redis with the new user count
      updateRedisUserCount();
    });
  });

  // Expose a method to get the current connected user count
  io.getConnectedUserCount = () => connectedUser;

  return io;
};

module.exports = { createSocketServer };
