// // routes/detail_transaksiRoutes.js
 const express = require('express');
 const router = express.Router();
 const detailTransaksiController = require('../controllers/detailtransaksicontroller.js');

// // Routes CRUD untuk Detail Transaksi
// router.get('/', detailTransaksiController.getAllDetailTransaksi);      // Mendapatkan semua detail transaksi
router.get('/:id_transaksi', detailTransaksiController.getDetailTransaksiById);
// router.post('/', detailTransaksiController.createDetailTransaksi);    // Membuat detail transaksi baru
// router.put('/:id', detailTransaksiController.updateDetailTransaksi);  // Memperbarui detail transaksi
// router.delete('/:id', detailTransaksiController.deleteDetailTransaksi); // Menghapus detail transaksi

 module.exports = router;