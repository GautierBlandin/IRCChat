const http = require("http");
const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
require('dotenv').config({path: './src/config/config.env'});
const jwt = require('jsonwebtoken');


// Load database
connectDB();

// Setup CORS options
const corsOptions = {origin: "*"};

// Load CORS with options
app.use(cors(corsOptions));

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Function routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/channel', require('./routes/channel.routes'));
app.use('/message', require('./routes/message.routes'));
app.use('/friendRequest', require('./routes/friendRequest.routes'));

const server = http.createServer(app);

// Socket IO
const SocketIo = require("socket.io");


const io = SocketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    socket.userId = payload.id;

    socket.on('channel_join', (channelId), callback => {
        socket.channelId = channelId;

        if (error) return callback(error);

        socket.emit('message', formatMessage('Welcome to chat!'));

        socket.join(channelId);

        socket.broadcast.to(channelId).emit('message', formatMessage('A user has joined the channel'));

        callback();
    });

    socket.on('message_send', (message, callback) => {
        if(message !== '') console.log('message: ' + message);

        io.to(socket.channelId).emit('message', { text: message });

        callback();
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(process.env.SERVER_PORT, function () {
    console.log("\x1b[44m%s\x1b[0m", "Starting Server on " + process.env.SERVER_PORT + " port");
});
