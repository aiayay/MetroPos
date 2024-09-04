const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Periksa apakah `User` diimpor dengan benar

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
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    // Generate token
    const token = jwt.sign({ id_user: user.id_user, level: user.level }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile (requires login)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_user);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
