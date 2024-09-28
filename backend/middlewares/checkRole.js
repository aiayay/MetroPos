// checkRole.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan informasi user dari token ke req.user

    // Periksa apakah sesi user ada, untuk penggunaan session
    if (!req.session.user) {
      return res.status(403).json({ message: 'Anda harus login terlebih dahulu' });
    }

    next(); // Lanjutkan ke middleware atau route handler berikutnya
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};
