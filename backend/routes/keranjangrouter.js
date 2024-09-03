const express = require('express');
const router = express.Router();
const keranjangController = require('../controllers/keranjangcontroller.js');

// Mendapatkan semua item keranjang
router.get('/', keranjangController.getAllKeranjang);

// Mendapatkan item keranjang berdasarkan ID
router.get('/:id', keranjangController.getKeranjangById);

// Menambahkan item keranjang baru
router.post('/', keranjangController.createKeranjang);

// Memperbarui item keranjang
router.put('/:id', keranjangController.updateKeranjang);

// Menghapus item keranjang
router.delete('/:id', keranjangController.deleteKeranjang);

module.exports = router;
