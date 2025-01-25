const WebSocket = require('ws');

const clients = new Map();

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            if (data.pollId) clients.set(data.pollId, ws);
        });

        ws.on('close', () => console.log('WebSocket disconnected'));
    });
};

const notifyClients = (pollId, updatedData) => {
    const client = clients.get(pollId);
    if (client) client.send(JSON.stringify(updatedData));
};

module.exports = { setupWebSocket, notifyClients };
