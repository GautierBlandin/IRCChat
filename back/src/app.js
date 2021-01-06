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

const server = app.listen(process.env.SERVER_PORT, function () {
    console.log("\x1b[44m%s\x1b[0m", "Starting Server on " + process.env.SERVER_PORT + " port");
});

// Socket IO 
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');

io.use(async(socket, next)=> {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        socket.userId = payload.id;
        next();
    } catch (error) {
        console.log(error);
    }
});

io.on('connection', (socket) => {
    console.log("Connected: " + socket.userId);

    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.userId);
    })
})