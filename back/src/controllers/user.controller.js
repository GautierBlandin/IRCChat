const User = require('../models/user.model');

/**
 * @desc Create User as admin panel
 * @route POST /user/create/:channelId
 * @param {User user} req.body
 */
exports.user_create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json("Error: " + error);
    }
}

/**
 * @desc Get specified user
 * @route GET /user/getOne/:id
 * @param {User id} req.params
 */
exports.user_getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw "user not found!";

        res.json(user);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Get all users
 * @route GET /user/getAll
 */
exports.user_getAll = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) throw "There are no users!";

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Update specified user
 * @route PUT /user/update/:id
 * @param {User id} req.params
 */
exports.user_update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        if (!user) throw "user not found!";

        res.status(200).json(user);
        console.log('User: ' + user._id + ' updated successfully!');
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}

/**
 * @desc Delete specified user
 * @route DELETE /user/delete/:id
 * @param {User id} req.params
 */
exports.user_delete = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw "user not found!";

        res.json(user);
        console.log('User: ' + user._id + ' deleted successfully!');
    } catch (error) {
        res.status(404).json("Error: " + error);
    }
}