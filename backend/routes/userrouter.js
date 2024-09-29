const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');
const authMiddleware = require('../middlewares/checkRole.js');

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Protected route (must be logged in)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Route based on level (admin only)
router.get('/admin', authMiddleware, (req, res) => {
  // Periksa level admin
  if (req.user.level !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak: Hanya untuk Admin' });
  }
  res.json({ message: 'Selamat datang Admin' });
});

// Route based on level (kasir only)
router.get('/kasir', authMiddleware, (req, res) => {
  // Periksa level kasir
  if (req.user.level !== 'kasir') {
    return res.status(403).json({ message: 'Akses ditolak: Hanya untuk Kasir' });
  }
  res.json({ message: 'Selamat datang Kasir' });
});

// Logout user
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Logout gagal bestie kuh' });
      }
      res.clearCookie('connect.sid'); // Hapus cookie session
      res.status(200).json({ message: 'Logout berhasil bestie' });
    });
  });
  

// Get all users
router.get('/users', userController.getAllUsers);

// Delete user by ID
router.delete('/users/:id', userController.deleteUser);

// Get user by ID
router.get('/users/:id', userController.getUserById);

router.put('/:id', userController.editUser);

router.post('/upload-foto/:id', userController.uploadUserPhoto);

module.exports = router;
