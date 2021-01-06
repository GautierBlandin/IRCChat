const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Current user is required!',
        ref: 'User'
    },
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Requested user is required!',
        ref: 'User'
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('friendRequest', FriendRequestSchema);