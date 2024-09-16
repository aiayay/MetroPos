const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Protected route (must be logged in)
router.get('/profile', authMiddleware, userController.getUserProfile);

router.get('/users', userController.getAllUsers);

// hapus
router.delete('/users/:id', userController.deleteUser);

// ambil 1 per id 
router.get('/users/:id', userController.getUserById);


module.exports = router;
