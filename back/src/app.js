const http = require("http");
const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db.config.js');
require('dotenv').config({path: './src/config/config.env'});


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

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(process.env.SERVER_PORT, function () {
    console.log("\x1b[44m%s\x1b[0m", "Starting Server on " + process.env.SERVER_PORT + " port");
});
