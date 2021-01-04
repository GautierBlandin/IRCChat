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

/**
 * @desc Get specified message
 * @route GET /message/getOne/:id
 * @param {Message id} req.params
 */
exports.message_getOne = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) throw "message not found!";

        res.json(message);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Get all messages
 * @route GET /message/getAll
 */
exports.message_getAll = async (req, res) => {
    try {
        const message = await Message.find();
        if (!message) throw "There are no messages!";

        res.status(200).json(message);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Update specified message
 * @route PUT /message/update/:id
 * @param {Message id} req.params
 */
exports.message_update = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        if (!message) throw "message not found!";

        res.json(message);
        console.log('message: ' + message._id + ' updated successfully!');
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Delete specified message
 * @route DELETE /message/delete/:id
 * @param {Message id} req.params
 */
exports.message_delete = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) throw "message not found!";

        const user = await User.findById(message.user);
        const channel = await Channel.findById(message.channel);

        user.messages.pop(message._id);
        channel.messages.pop(message._id);

        await user.save();
        await channel.save();

        res.json(message);
        console.log('Message: ' + message._id + ' deleted successfully!');
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}