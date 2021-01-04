const Channel = require('../models/channel.model');
const User = require('../models/user.model');

/**
 * @desc Create an empty Channel with current user informations and specified title
 * @route POST /channel/create
 */
exports.channel_create_empty = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const { title } = req.body;

        const user = await User.findById(currentUserId);
        if (!user) throw "User not found!";

        //const channelExist = await Channel.findOne({ title });
        //if (channelExist) throw "Channel with that name already existing!";

        const newChannel = new Channel({
            "title": title,
            "owner": user
        });

        await newChannel.save();

        user.channels.push(newChannel);

        await user.save();

        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}

/**
 * @desc Create Channel with current user at owner and requested user specified in params
 * @route POST /channel/create_withOne/:id
 * @param {User id} req.params
 */
exports.channel_create_withOne = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const requestedUserId = req.params.id;
        if (currentUserId == requestedUserId) throw "the current user cannot create a channel with himself!";

        const currentUser = await User.findById(currentUserId);
        if (!currentUser) throw "Current user or requested user does not exist!";

        const requestedUser = await User.findById(requestedUserId);
        if (!requestedUser) throw "Current user or requested user does not exist!";

        // Define the title of new channel
        const title = currentUser.username + ', ' + requestedUser.username;

        const newChannel = new Channel({
            "title": title,
        })

        newChannel.owner = currentUser;
        newChannel.users.push(currentUser);
        newChannel.users.push(requestedUser);

        await newChannel.save();

        currentUser.channels.push(newChannel);
        requestedUser.channels.push(newChannel);

        await currentUser.save();
        await requestedUser.save();

        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}

/**
 * @desc Get all channels
 * @route GET /channel/getAll
 */
exports.channel_getAll = async (req, res) => {
    try {
        const channel = await Channel.find();
        if (!channel) throw "There are no channels!";

        res.status(200).json(channel);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Get specified channel
 * @route GET /channel/getOne/:id
 * @param {Channel id} req.params
 */
exports.channel_getOne = async (req, res) => {
    try {
        const channel = await Channel.findById({ _id: req.params.id });
        if (!channel) throw "channel not found!";

        res.json(channel);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Update specified channel
 * @route PUT /channel/update/:id
 * @param {Channel id} req.params
 */
exports.channel_update = async (req, res) => {
    try {
        const channel = await Channel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        if (!channel) throw "channel not found!";

        res.json(channel);
        console.log('Channel: ' + channel._id + ' updated successfully!');
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Delete specified channel
 * @route DELETE /channel/delete/:id
 * @param {Channel id} req.params
 */
exports.channel_delete = async (req, res) => {
    try {
        const channel = await Channel.findByIdAndDelete(req.params.id);
        if (!channel) throw "channel not found!";

        const user = await User.findById(channel.owner);

        user.channels.pop(channel._id);

        await user.save();

        res.json(channel);
        console.log('Channel: ' + channel._id + ' deleted successfully!');
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Add users to specified channel
 * @route POST /channel/addUser/:id
 * @param {Channel id} req.params
 * @param {Array||String users} req.body
 */
exports.channel_addUser = async (req, res) => {
    try {
        const { users } = req.body;
        if (!users) throw "Users not provided!"

        const channel = await Channel.findByIdAndUpdate(req.params.id, {
            $push: {
                users: users
            }
        });
        if (!channel) throw "channel not found!";

        //users.forEach(user => {
        //    console.log(user);
        //});

        res.json(channel);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}