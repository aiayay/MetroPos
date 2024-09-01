// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/suppliercontroller.js');

// Routes CRUD untuk Supplier
router.get('/', supplierController.getAllSuppliers);           // Mendapatkan semua supplier
router.get('/:id', supplierController.getSupplierById);       // Mendapatkan supplier berdasarkan ID
router.post('/', supplierController.createSupplier);          // Membuat supplier baru
router.put('/:id', supplierController.updateSupplier);        // Memperbarui supplier
router.delete('/:id', supplierController.deleteSupplier);     // Menghapus supplier

module.exports = router;
