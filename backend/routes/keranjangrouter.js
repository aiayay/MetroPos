const express = require('express');
const router = express.Router();
const keranjangcontroller = require('../controllers/keranjangcontroller.js'); // Sesuaikan huruf besar 'C'

// Routes CRUD untuk Keranjang
router.get('/', keranjangcontroller.getAllKeranjang); // Gunakan keranjangController
router.get('/:id', keranjangcontrollerr.getKeranjangById);
router.post('/', keranjangcontroller.createKeranjang);
router.put('/:id', keranjangcontroller.updateKeranjang);
router.delete('/:id', keranjangcontroller.deleteKeranjang);

module.exports = router;
