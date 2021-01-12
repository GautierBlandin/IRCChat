const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const ChannelController = require('../controllers/channel.controller');

router.post('/', checkAuth, ChannelController.channel_create_empty); //create empty channel
router.post('/:id', checkAuth, ChannelController.channel_create_withOne);
router.put('/:id', ChannelController.channel_update);
router.delete('/:id', ChannelController.channel_delete);
router.put('/addUser/:id', ChannelController.channel_addUser);
router.get('/', ChannelController.channel_getAll);
router.get('/:id', ChannelController.channel_getOne);

module.exports = router;
