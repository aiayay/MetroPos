const express = require("express");
const router = express.Router();
const products = require("../controllers/productController.js");

// Rute untuk produk
router.post("/products", products.create);
router.get("/products", products.findAll);
router.get("/products/:id", products.findOne);
router.put("/products/:id", products.update);
router.delete("/products/:id", products.delete);

module.exports = router;
