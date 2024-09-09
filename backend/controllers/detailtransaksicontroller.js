const db = require('../models');
const detailtransaksi = db.DetailTransaksi;
const produk = db.Produk; // Import model Produk

// Mendapatkan semua detail transaksi dengan nama produk dari tabel Produk
exports.getAllDetailTransaksi = async (req, res) => {
  try {
    const detailTransaksi = await detailtransaksi.findAll({
      include: [
        {
          model: produk,
          as: 'produk', // Alias sesuai dengan relasi di model
          attributes: ['nmproduk'] // Ambil hanya nama produk
        }
      ]
    });
    res.status(200).json(detailTransaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mendapatkan detail transaksi berdasarkan ID, dengan nama produk dari tabel Produk
exports.getDetailTransaksiById = async (req, res) => {
  const id = req.params.id;
  try {
    const detailTransaksi = await detailtransaksi.findByPk(id, {
      include: [
        {
          model: produk,
          as: 'produk',
          attributes: ['nmproduk'] // Ambil nama produk
        }
      ]
    });

    if (detailTransaksi) {
      res.status(200).json(detailTransaksi);
    } else {
      res.status(404).json({ message: "Detail Transaksi not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Membuat detail transaksi baru, mengisi nama produk dari tabel Produk
exports.createDetailTransaksi = async (req, res) => {
  try {
    const { id_produk, id_transaksi, kuantitas, potongan, total_bayar, metode_bayar } = req.body;

    // Cari produk berdasarkan id_produk untuk mendapatkan harga dan nama produk
    const produkData = await produk.findByPk(id_produk);

    if (!produkData) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // Hitung total harga
    const total_harga = produkData.harga_jual * kuantitas;

    // Buat detail transaksi dengan nmproduk dari produk
    const newDetailTransaksi = await detailtransaksi.create({
      id_transaksi,
      id_produk,
      nmproduk: produkData.nmproduk, // Ambil nama produk dari tabel Produk
      harga_produk: produkData.harga_jual,
      kuantitas,
      total_harga,
      potongan,
      total_bayar,
      metode_bayar
    });

    res.status(201).json(newDetailTransaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Memperbarui detail transaksi berdasarkan ID
exports.updateDetailTransaksi = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await detailtransaksi.update(req.body, { where: { id_detailtrans: id } });
    
    if (updated[0] > 0) { // Check if any row is updated
      res.status(200).json({ message: "Detail Transaksi updated successfully" });
    } else {
      res.status(404).json({ message: "Detail Transaksi not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Menghapus detail transaksi berdasarkan ID
exports.deleteDetailTransaksi = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await detailtransaksi.destroy({ where: { id_detailtrans: id } });
    
    if (deleted) {
      res.status(200).json({ message: "Detail Transaksi deleted successfully" });
    } else {
      res.status(404).json({ message: "Detail Transaksi not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
