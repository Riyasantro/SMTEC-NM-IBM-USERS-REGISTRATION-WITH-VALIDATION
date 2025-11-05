const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// public
router.post('/register', controller.register);
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserById);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;
