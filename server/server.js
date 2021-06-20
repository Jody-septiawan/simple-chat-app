require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000" //client url
    }
});

require('./src/socket')(io);

const port = 5000;

app.use(express.json());
app.use(cors())

server.listen(port, () => console.log(`Running on port ${port}`));