const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register User
exports.registerUser = async (req, res) => {
  const { username, password, nama_lengkap, notlp, jk, level, foto } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      nama_lengkap,
      notlp,
      jk,
      level,
      foto
    });

    res.status(201).json({
      success: true,
      message: 'User berhasil didaftarkan',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mendaftarkan user', error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign(
      { id_user: user.id_user, level: user.level }, 
      process.env.JWT_SECRET, // Menggunakan JWT secret dari environment
      { expiresIn: '1h' }
    );

    // Simpan user ke dalam sesi
    req.session.user = {
      id: user.id_user,
      username: user.username,
      level: user.level
    };

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id_user,
        username: user.username,
        level: user.level
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile (requires login)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id); // Menggunakan req.session.user.id
    if (!user) return res.status(404).json({ success: false, message: 'User tidak ditemukan' });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mendapatkan profil user', error: error.message });
  }
};

// Get all users (without token verification)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude password
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Exclude password
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mendapatkan user', error: error.message });
  }
};

// Delete User by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    await user.destroy(); // Hapus user

    res.status(200).json({ success: true, message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menghapus user', error: error.message });
  }
};
