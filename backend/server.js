const express = require("express");
const cors = require("cors");

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import semua router
const detailtransaksirouter = require("./routes/detailtransaksirouter.js");
const produkRouter = require("./routes/produktrouter.js");
const kategoriRouter = require("./routes/kategorirouter.js");
const keranjangRouter = require("./routes/keranjangrouter.js");
const pembelianRouter = require("./routes/pembelianrouter.js");
const supplierRouter = require("./routes/supplierrouter.js");
const transaksiRouter = require("./routes/transaksirouter.js");
const memberRouter = require("./routes/memberrouter.js");
const userrouter = require("./routes/userrouter.js");

// Gunakan router yang diimport
app.use("/api/detailtransaksi", detailtransaksirouter);
app.use("/api/produk", produkRouter);
app.use("/api/kategori", kategoriRouter);
app.use("/api/keranjang", keranjangRouter);
app.use("/api/pembelian", pembelianRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/transaksi", transaksiRouter);
app.use("/api/member", memberRouter);
app.use("/api/user", userrouter);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Aplikasi kasir ready" });
});

// Koneksi ke database
const db = require("./models");
const user = require("./models/user.js");
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
