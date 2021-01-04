const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const MessageController = require('../controllers/message.controller');

router.post('/create/:channelId', checkAuth, MessageController.message_create);

module.exports = router;
