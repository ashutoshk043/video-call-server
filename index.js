const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3000;
let clients = [];

app.use(express.static('public'));

// Handle WebSocket connections
wss.on('connection', (ws) => {
    clients.push(ws);
    console.log(`New client connected m. Total clients: ${clients.length}`);

    ws.on('message', (message) => {
        // Broadcast messages to all clients except the sender
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter((client) => client !== ws);
        console.log(`Client disconnected. Total clients: ${clients.length}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
