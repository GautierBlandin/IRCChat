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

const User = require('../models/user.model');
const Message = require('../models/message.model');

io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    socket.userId = payload.id;

    console.log("Connected: " + socket.userId ?? '');

    socket.on('channel_join', (channelId) => {

        socket.join(channelId);

        socket.emit('message', formatMessage('Welcome to chat!'));
        socket.broadcast.to(channelId).emit('message', formatMessage('A user has joined the channel'));
    });

    socket.on('message_send', async ({ channelId, message }) => {
        if(message !== '') console.log('message: ' + message);

        const user = await User.findOne({ _id: socket.userId });

        const newMessage = new Message({
            channel: channelId,
            user: user,
            content: message,
            isActive: true
          });

        io.to(channelId).emit('message', {
            message,
            user: user,
        });

        await newMessage.save();
    });

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });
});

server.listen(process.env.SERVER_PORT, function () {
    console.log("\x1b[44m%s\x1b[0m", "Starting Server on " + process.env.SERVER_PORT + " port");
});
