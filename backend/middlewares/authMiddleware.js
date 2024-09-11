const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = decoded; // Simpan informasi user dari token ke req.user
    next(); // Lanjutkan ke middleware berikutnya atau route handler
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};
