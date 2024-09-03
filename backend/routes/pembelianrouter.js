const express = require('express');
const router = express.Router();
const pembelianController = require('../controllers/pembeliancontroller.js');

// Mendapatkan semua pembelian
router.get('/', pembelianController.getAllPembelian);

// Mendapatkan pembelian berdasarkan ID
router.get('/:id', pembelianController.getPembelianById);

// Menambahkan pembelian baru
router.post('/', pembelianController.createPembelian);

// Mengedit pembelian
router.put('/:id', pembelianController.updatePembelian);

// Menghapus pembelian
router.delete('/:id', pembelianController.deletePembelian);

module.exports = router;
