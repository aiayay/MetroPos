const express = require("express");
const router = express.Router();
const products = require("../controllers/produkcontroller.js");
const { produk } = require("../models/index.js");

// Rute untuk produk
router.post("/produk", products.create);
router.get("/produk", products.findAll);
router.get("/produk/:id", products.findOne);
router.put("/produk/:id", products.update);
router.delete("/produk/:id", products.delete);


module.exports = router;
