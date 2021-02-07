const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connection.on('connecting', () => { 
            console.log('[database] connecting')
        });

        mongoose.connection.on('connected', () => {
            console.log('[database] connected');
        });

        mongoose.connection.on('disconnecting', () => {
            console.log('[database] disconnecting');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('[database] disconnected');
        });

        const connection = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;