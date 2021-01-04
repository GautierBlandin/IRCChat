const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const ChannelController = require('../controllers/channel.controller');

router.post('/create', checkAuth, ChannelController.channel_create_empty); //create empty channel
router.post('/create_with/:id', checkAuth, ChannelController.channel_create_withOne); //create empty channel
router.put('/update/:id', ChannelController.channel_update);
router.delete('/delete/:id', ChannelController.channel_delete);

module.exports = router;
