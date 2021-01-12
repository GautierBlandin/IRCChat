const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const MessageController = require('../controllers/message.controller');

router.post('/:channelId', checkAuth, MessageController.message_create);
router.get('/:id', MessageController.message_getOne);
router.get('/', MessageController.message_getAll);
router.put('/:id', MessageController.message_update);
router.delete('/:id', MessageController.message_delete);

module.exports = router;
