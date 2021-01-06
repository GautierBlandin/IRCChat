const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const router = express.Router();

const friendRequestController = require('../controllers/friendRequest.controller');

router.post('/create/:id', checkAuth, friendRequestController.friendRequest_create);
router.post('/accept/:id', checkAuth, friendRequestController.friendRequest_accept);

module.exports = router;
