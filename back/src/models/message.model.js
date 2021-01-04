const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Channel is required!',
        ref: 'Channel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required!',
        ref: 'User'
    },
    content: {
        type: String,
        required: 'Content is required!'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);