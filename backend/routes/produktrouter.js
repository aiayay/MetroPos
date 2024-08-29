// routes/produkRoutes.js
const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkcontroller.js');

// Routes CRUD untuk Produk
router.get('/', produkController.getAllProduk);      // Mendapatkan semua produk
router.get('/:id', produkController.getProdukById); // Mendapatkan produk berdasarkan ID
router.post('/', produkController.createProduk);    // Membuat produk baru
router.put('/:id', produkController.updateProduk);  // Memperbarui produk
router.delete('/:id', produkController.deleteProduk); // Menghapus produk

module.exports = router;
