const Channel = require('../models/channel.model');
const User = require('../models/user.model');

/**
 * @desc Channel create an empty Channel with current user informations and specified title
 * @route POST /channel/create
 * @body Channel(title)
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
            "title": title
        });
    
        newChannel.owner = user;
    
        await newChannel.save();
    
        user.channels.push(newChannel);
    
        await user.save();
    
        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}

exports.channel_create_withOne = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const requestedUserId = req.params.id;

        if(currentUserId == requestedUserId) throw "the current user cannot create a channel with himself!";

        const currentUser = await User.findById(currentUserId);
        if (!currentUser) throw "Current user or requested user does not exist!";

        const requestedUser = await User.findById(requestedUserId);
        if (!requestedUser) throw "Current user or requested user does not exist!";

        const title = currentUser.username + ', ' + requestedUser.username;

        const newChannel = new Channel({
            "title": title,
        })

        newChannel.owner = currentUser;
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
 * @desc Channel get all
 * @route GET /channel/getAll
 * @param Null
 */
exports.channel_getAll = async (req, res) => {
    const channel = await Channel.find();

    res.json(channel);
}

/**
 * @desc Channel get specified channel
 * @route GET /channel/getOne/:id
 */
exports.channel_getOne = async (req, res) => {
    const { id } = req.params;

    const channel = await Channel.findById({_id: id});

    res.json(channel);
}
