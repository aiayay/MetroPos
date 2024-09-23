const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produkcontroller.js");

// Routes CRUD untuk Produk
router.get("/", produkController.findAll); // Mendapatkan semua produk
router.get("/:id", produkController.findOne); // Mendapatkan produk berdasarkan ID
router.post("/", produkController.create); // Membuat produk baru
router.put("/:id", produkController.update); // Memperbarui produk
router.delete("/:id", produkController.delete); // Menghapus produk
router.get("/kategori/:kategori", produkController.findByCategory);
module.exports = router;
// hhhh