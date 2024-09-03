const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategoricontroller.js");

// Route untuk kategori
router.get("/", kategoriController.getAllCategories);
router.get("/:id", kategoriController.getCategoryById);
router.post("/", kategoriController.createCategory);
router.put("/:id", kategoriController.updateCategory);
router.delete("/:id", kategoriController.deleteCategory);
router.get("/search", kategoriController.searchCategories);


module.exports = router;
