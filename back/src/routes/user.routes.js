const express = require('express');
const checkAuth = require('../security/verifyToken.security');
const checkRole = require('../security/verifyRole.security');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/create', checkAuth, checkRole('admin'), UserController.channel_create_empty); // Only admin
router.put('/update/:id', checkAuth, UserController.user_update); //Only currentUser || admin
router.delete('/delete/:id', checkAuth, UserController.user_delete); //Only currentUser || admin
router.get('/getOne/:id', UserController.user_getOne);
router.get('/getAll', UserController.user_getAll);

module.exports = router;
