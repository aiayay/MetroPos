// routes/transaksirouter.js
const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksicontroller.js'); // Pastikan pathnya benar

// Mendapatkan semua transaksi
router.get('/', transaksiController.getAllTransaksi);

// Mendapatkan transaksi berdasarkan ID
router.get('/:id', transaksiController.getTransaksiById);

// Menambahkan transaksi baru
router.post('/', transaksiController.createTransaksi);

// Mengedit transaksi
router.put('/:id', transaksiController.updateTransaksi);

// Menghapus transaksi
router.delete('/:id', transaksiController.deleteTransaksi);

module.exports = router;
