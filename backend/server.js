const express = require('express');
const cors = require('cors');

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Import semua router
//const detailTransaksiRoutes = require('./routes/detailTransaksiRoutes');
//const keranjangRoutes = require('./routes/keranjangRoutes');
// const produkRoutes = require('./routes/produkRoutes.js');
// const kategoriRoutes = require('./routes/kategoriRoutes.js');
// const pembelianRoutes = require('./routes/pembelianRoutes.js');
// const supplierRoutes = require('./routes/supplierRoutes.js');
// const transaksiRoutes = require('./routes/transaksiRoutes,js');
// const memberRoutes = require('./routes/memberRoutes.js');
// const userRoutes = require('./routes/userRoutes.js');


// //Gunakan router yang diimport
// app.use('/api/detailTransaksi', detailTransaksiRoutes);
// app.use('/api/keranjang', keranjangRoutes);
// app.use('/api/produk', produkRoutes);
// app.use('/api/kategori', kategoriRoutes);
// app.use('/api/pembelian', pembelianRoutes);
// app.use('/api/supplier', supplierRoutes);
// app.use('/api/transaksi', transaksiRoutes);
// app.use('/api/member', memberRoutes);
// app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'hello ' });
});
//Koneksi ke database
const db = require('./models');
db.sequelize.sync();

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});