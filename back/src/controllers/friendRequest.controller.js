const User = require('../models/user.model');
const FriendRequest = require('../models/friendRequest.model');

/**
 * @desc Create friend request with current user (passed in token) Id corresponds to requested user
 * @route POST /friendRequest/create/:id
 * @param {User id} req.params.id
 */
exports.friendRequest_create = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const requestedUserId = req.params.id;
        if (currentUserId == requestedUserId) throw "the current user cannot create a channel with himself!";

        const currentUser = await User.findById(currentUserId);
        if (!currentUser) throw "Current user or requested user does not exist!";

        const requestedUser = await User.findById(requestedUserId);
        if (!requestedUser) throw "Current user or requested user does not exist!";

        const newFriendRequest = new FriendRequest({
            "userFrom": currentUser,
            "userTo": requestedUser,
            "isAccepted": false
        });

        await newFriendRequest.save();

        res.status(201).json(newFriendRequest);

    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}

/**
 * @desc Accept friend request by requested user (token required), Id corresponds to friendRequest selected
 * @route POST /friendRequest/create/:id
 * @param {User id} req.params.id
 */
exports.friendRequest_accept = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const friendRequestId = req.params.id;

        const friendRequest = await FriendRequest.findById(friendRequestId);
        if(!friendRequestId) throw "Friend request does not exist!";

        if(friendRequest.isAccepted) throw "Friend request already accepted!";

        if(currentUserId != friendRequest.userTo) throw "Only requested User can accept friend request!"

        const userFromId = friendRequest.userFrom;
        const userFrom = await User.findById(userFromId);
        if(!userFrom) throw "UserFrom not found!";

        const userToId = friendRequest.userTo;
        const userTo = await User.findById(userToId);
        if(!userTo) throw "UserTo not found!";

        friendRequest.isAccepted = true;

        await friendRequest.save();

        if(userFrom.friends.includes(userToId) || userTo.friends.includes(userFromId)) throw "Users are already friends!";

        userFrom.friends.push(userTo);
        userTo.friends.push(userFrom);

        await userFrom.save();
        await userTo.save();

        res.status(201).json(friendRequest);
    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}
