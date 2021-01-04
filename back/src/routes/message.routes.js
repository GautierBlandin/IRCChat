const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const MessageController = require('../controllers/message.controller');

router.post('/create/:channelId', checkAuth, MessageController.message_create);
router.get('/getOne/:id', MessageController.message_getOne);
router.get('/getAll', MessageController.message_getAll);
router.put('/update/:id', MessageController.message_update);
router.delete('/delete/:id', MessageController.message_delete);

module.exports = router;
