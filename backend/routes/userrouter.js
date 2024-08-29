const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');


// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Protected route (must be logged in)
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
