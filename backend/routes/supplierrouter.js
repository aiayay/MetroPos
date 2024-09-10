const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/suppliercontroller.js");

// Mendapatkan semua supplier
router.get("/", supplierController.getAllSuppliers);

// Mendapatkan supplier berdasarkan ID
router.get("/:id", supplierController.getSupplierById);

// Membuat supplier baru
router.post("/", supplierController.createSupplier);

// Memperbarui supplier
router.put("/:id", supplierController.updateSupplier);

// Menghapus supplier
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
