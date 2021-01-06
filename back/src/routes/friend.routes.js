const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const friendController = require('../controllers/friendRequest.controller');

//router.post('/create/:id', checkAuth, friendController.friendRequest_create);

module.exports = router;
