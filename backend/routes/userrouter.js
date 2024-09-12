const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get all users (without auth middleware for now)
router.get('/users', userController.getAllUsers);

// Protected route (must be logged in)
router.get('/profile', userController.getUserProfile);

module.exports = router;
