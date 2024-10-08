const express = require("express");
const cors = require("cors");
const path = require("path"); // Mengimpor path
require('dotenv').config();
const session = require("express-session");

// Inisialisasi Express
const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
};

// Middleware
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key', // Ganti dengan secret yang kuat
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true jika menggunakan HTTPS
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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