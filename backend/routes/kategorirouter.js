const express = require('express');
const router = express.Router();
const kategoriController = require("../controllers/kategoricontroller.js");

// Route untuk kategori
router.get('/kategori', kategoriController.getAllCategories);
router.get('/kategori/:id', kategoriController.getCategoryById);
router.post('/kategori', kategoriController.createCategory);
router.put('/kategori/:id', kategoriController.updateCategory);
router.delete('/kategori/:id', kategoriController.deleteCategory);
router.get('/kategori/search', kategoriController.searchCategories);

module.exports = router;
