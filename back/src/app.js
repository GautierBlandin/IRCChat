const http = require("http");
const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
require('dotenv').config({ path: './src/config/config.env' });
const jwt = require('jsonwebtoken');


// Load database
connectDB();

// Setup CORS options
const corsOptions = { origin: "*" };

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

const User = require('../src/models/user.model');
const Message = require('../src/models/message.model');
const Channel = require('../src/models/channel.model');

io.on("connection", async (socket)  => {
    const token = socket.handshake.query.token;
    console.log('token:' + token);
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    socket.userId = payload.id;
    socket.user = await User.findById(payload.id);

    socket.on('channel_join', (channelId) => {

        socket.join(channelId);
        console.log(socket.userId + ' joined ' + channelId)

        socket.broadcast.to(channelId).emit('user_joined', { user: socket.user, channelId: channelId });

    });

    socket.on('channel_left', (channelId) => {

        socket.leave(channelId);
        console.log(socket.userId + ' left ' + channelId)

        socket.broadcast.to(channelId).emit('user_left', { user: socket.user, channelId: channelId });
    });

    socket.on('message_send', async ({ channelId, message }) => {
        if (message !== '') console.log('message: ' + message);

        // find all information of current user
        const currentUser = await User.findOne({ _id: socket.userId });

        const channel = await Channel.findById(channelId);

        // Detect command with "/" prefix
        if (message.startsWith('/')) {
            if (message.includes("help", 1)) {
                message = 'w.i.p';
            } else if (message.includes("ping", 1)) {
                message = 'pong!';
            } else if (message.includes("shrug", 1)) {
                message = '¯\_(ツ)_/¯';
            } else if (message.includes("lenny", 1)) {
                message = '( ͡° ͜ʖ ͡°)';
            } else if (message.includes("disapproval", 1)) {
                message = 'ಠ_ಠ';
            }
        }
        const newMessage = new Message({
            "channel": channelId,
            "user": currentUser,
            "content": message,
            "isActive": true
        });

        io.to(channelId).emit('message', newMessage);

        await newMessage.save();

        currentUser.messages.unshift(newMessage);
        channel.messages.unshift(newMessage);

        await currentUser.save();
        await channel.save();
    });

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });
});

server.listen(process.env.SERVER_PORT, function () {
    console.log("\x1b[44m%s\x1b[0m", "Starting Server on " + process.env.SERVER_PORT + " port");
});
