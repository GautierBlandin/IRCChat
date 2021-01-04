const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Owner is required!',
        ref: 'User'
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Message'
    }],
    title: {
        type: String,
        required: 'Title is required!'
    },
    subtitle: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Channel', ChannelSchema);