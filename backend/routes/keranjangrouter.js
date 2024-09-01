// routes/keranjangRoutes.js
const express = require('express');
const router = express.Router();
const keranjangController = require('../controllers/keranjangcontroller.js');

// Routes CRUD untuk Keranjang
router.get('/', keranjangController.getAllKeranjang);
router.get('/:id', keranjangController.getKeranjangById);
router.post('/', keranjangController.createKeranjang);
router.put('/:id', keranjangController.updateKeranjang);
router.delete('/:id', keranjangController.deleteKeranjang);

module.exports = router;
