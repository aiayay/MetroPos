const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const multer = require('multer');
const path = require('path');


// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users'); // Ganti dengan path folder pengguna
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan dengan nama unik
  }
});

const upload = multer({ storage: storage }).single('foto'); // Middleware multer

// Fungsi untuk meng-upload foto pengguna
// Fungsi untuk meng-upload foto pengguna
exports.uploadUserPhoto = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Gagal mengupload foto', error: err.message });
    }

    try {
      const userId = req.params.id; // Mengambil id pengguna dari parameter
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }

      // Membentuk URL dari path foto yang disimpan
      const baseUrl = `${req.protocol}://${req.get('host')}/`; // Mendapatkan base URL
      user.foto = `${baseUrl}uploads/users/${req.file.filename}`; // Menyimpan URL foto ke dalam database
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Foto berhasil diupload',
        data: user // Menampilkan data pengguna yang sudah diperbarui
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Gagal mengupdate foto pengguna', error: error.message });
    }
  });
};

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

// Edit User
exports.editUser = async (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { username, password, nama_lengkap, notlp, jk, level, foto } = req.body; // Ambil data dari body request

  try {
    const user = await User.findByPk(id); // Cari pengguna berdasarkan ID

    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    // Jika password baru disertakan, hash password tersebut
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Update informasi pengguna
    user.username = username || user.username; // Jika tidak ada username baru, gunakan yang lama
    user.nama_lengkap = nama_lengkap || user.nama_lengkap;
    user.notlp = notlp || user.notlp;
    user.jk = jk || user.jk;
    user.level = level || user.level;
    user.foto = foto || user.foto;

    await user.save(); // Simpan perubahan

    res.status(200).json({
      success: true,
      message: 'User berhasil diperbarui',
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui user', error: error.message });
  }
};

