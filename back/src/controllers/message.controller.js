const Channel = require('../models/channel.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');

/**
 * @desc Create Message
 * @route POST /message/create/:channelId
 * @param {Channel channelId} req.params
 * @param {String content} req.body
 */
exports.message_create = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const { channelId } = req.params;

        const currentUser = await User.findById(currentUserId);
        if (!currentUser) throw "Current user or requested user does not exist!";

        const channel = await Channel.findById(channelId);
        if (!channel) throw "Channel not found!";

        const newMessage = new Message({
            "channel": channel,
            "user": currentUser,
            "content": req.body.content,
            "isActive": true
        });
        
        await newMessage.save();

        currentUser.messages.push(newMessage);
        channel.messages.push(newMessage);

        await currentUser.save();
        await channel.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}