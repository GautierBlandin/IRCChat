const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

/**
 * @desc User register
 * @route POST /auth/register
 */
exports.auth_register = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }, async function (err, user) {
            if (err) console.log(err);

            if (!user) {
                await bcrypt.hash(req.body.password, 10, function (err, cryptedPassword) {
                    req.body.password = cryptedPassword;
                    req.body.role = "user";
                    req.body.isActive = true;

                    User.create(req.body).then(
                        (user) => {
                            res.status(201).json({
                                user: user
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(500).json({
                                error: error
                            });
                        }
                    );

                });
            } else {
                return res.status(400).json({
                    error: "User already existing"
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error on the server");
    }
}

/**
 * @desc User login
 * @route POST /auth/login
 */
exports.auth_login = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }, async function (err, user) {
            if (err) {
                console.log(err);
            }

            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {

                    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);

                    res.header('auth-token', token).send(token);
                } else {
                    res.status(404).send({
                        auth: false,
                        message: "Authentication failed"
                    })
                }
            } else {
                res.status(404).json({
                    auth: false,
                    error: "User does not exist"
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Error on the server");
    }
}

/**
 * @description 
 * @route GET /token
 */
exports.auth_token = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        console.log(currentUserId);

        const currentUser = await User.findOne({_id: currentUserId}, {password: 0});
        if (!currentUser) throw "Current user or requested user does not exist!";

        res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error on the server");
    }
}