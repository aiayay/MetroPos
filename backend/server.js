const express = require('express');
const cors = require('cors');

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import semua router
const detailtransaksirouter = require('./routes/detailtransaksirouter.js');
const produkRouter = require('./routes/produkRouter.js');
const kategoriRoutes = require('./routes/kategoriRoutes.js');
// Uncomment router lainnya saat sudah siap digunakan
// const keranjangRoutes = require('./routes/keranjangRoutes');
// const pembelianRoutes = require('./routes/pembelianRoutes.js');
// const supplierRoutes = require('./routes/supplierRoutes.js');
// const transaksiRoutes = require('./routes/transaksiRoutes.js');
// const memberRoutes = require('./routes/memberRoutes.js');
// const userRoutes = require('./routes/userRoutes.js');

// Gunakan router yang diimport
app.use('/api/detailtransaksi', detailtransaksirouter);
app.use('/api/produk', produkRouter);
app.use('/api/kategori', kategoriRoutes);
// Uncomment penggunaan router lainnya saat sudah siap
// app.use('/api/keranjang', keranjangRoutes);
// app.use('/api/pembelian', pembelianRoutes);
// app.use('/api/supplier', supplierRoutes);
// app.use('/api/transaksi', transaksiRoutes);
// app.use('/api/member', memberRoutes);
// app.use('/api/user', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Aplikasi kasir ready' });
});

// Koneksi ke database
const db = require('./models');
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});