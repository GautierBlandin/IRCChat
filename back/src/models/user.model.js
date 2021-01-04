const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Channel'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Message'
    }],
    username: {
        type: String,
        required: 'Username is required!'
    },
    bio: {
        type: String,
        required: false
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