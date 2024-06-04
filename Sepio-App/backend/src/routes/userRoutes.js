const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD operations for users
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
