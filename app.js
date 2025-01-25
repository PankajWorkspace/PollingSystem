require('dotenv').config();
const express = require('express');
const pollRoutes = require('./routes/polls');
const voteRoutes = require('./routes/votes');
const { setupWebSocket } = require('./websocket/ws');
const app = express();

app.use(express.json());
app.use('/polls', pollRoutes);
app.use('/votes', voteRoutes);

const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
});
setupWebSocket(server);
