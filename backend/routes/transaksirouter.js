// routes/transaksiRoutes.js
const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');

// Routes CRUD untuk Transaksi
router.get('/', transaksiController.getAllTransaksi);      // Mendapatkan semua transaksi
router.get('/:id', transaksiController.getTransaksiById); // Mendapatkan transaksi berdasarkan ID
router.post('/', transaksiController.createTransaksi);    // Membuat transaksi baru
router.put('/:id', transaksiController.updateTransaksi);  // Memperbarui transaksi
router.delete('/:id', transaksiController.deleteTransaksi); // Menghapus transaksi

module.exports = router;
