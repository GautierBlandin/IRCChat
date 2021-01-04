const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    channel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    firstname: {
        type: String,
        required: 'Firstname is required!'
    },
    lastname: {
        type: String,
        required: 'Lastname is required!'
    },
    email: {
        type: String,
        required: 'Email is required!',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required!'
    },
    role: {
        type: String,
        required: 'Role is required!',
        default: 'user',
        enum: ["user", "admin"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);