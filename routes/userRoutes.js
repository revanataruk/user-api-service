const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', authenticateToken, userController.getUserData);
router.delete('/users/:id', authenticateToken, userController.deleteUser);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.patch('/users/:id/status', authenticateToken, userController.setUserStatus);

module.exports = router;