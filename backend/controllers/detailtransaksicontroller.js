const { DetailTransaksi, Transaksi, Produk } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Mendapatkan semua detail transaksi
exports.getAllDetailTransaksi = async (req, res) => {
  try {
    const detailTransaksi = await DetailTransaksi.findAll({
      include: [
        { model: Transaksi, as: 'transaksi' },
        { model: Produk, as: 'produk' }
      ]
    });
    res.status(200).json(detailTransaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan detail transaksi berdasarkan ID
exports.getDetailTransaksiById = async (req, res) => {
  const { id } = req.params;
  try {
    const detailTransaksi = await DetailTransaksi.findByPk(id, {
      include: [
        { model: Transaksi, as: 'transaksi' },
        { model: Produk, as: 'produk' }
      ]
    });
    if (!detailTransaksi) {
      return res.status(404).json({ error: 'Detail transaksi tidak ditemukan' });
    }
    res.status(200).json(detailTransaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat detail transaksi baru
exports.createDetailTransaksi = async (req, res) => {
  const { id_transaksi, id_produk, nmproduk, harga_produk, kuantitas, catatan } = req.body;

  try {
    // Cek apakah transaksi dan produk ada
    const transaksi = await Transaksi.findByPk(id_transaksi);
    const produk = await Produk.findByPk(id_produk);

    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }

    if (!produk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Mengecek stok produk
    if (produk.stok < kuantitas) {
      return res.status(400).json({ error: 'Stok produk tidak mencukupi' });
    }

    // Membuat detail transaksi
    const newDetailTransaksi = await DetailTransaksi.create({
      id_detailtrans: uuidv4(),
      id_transaksi,
      id_produk,
      nmproduk,
      harga_produk,
      kuantitas,
      catatan
    });

    // Mengurangi stok produk
    await Produk.decrement('stok', {
      by: kuantitas,
      where: { id_produk }
    });

    res.status(201).json(newDetailTransaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui detail transaksi
exports.updateDetailTransaksi = async (req, res) => {
  const { id } = req.params;
  const { id_produk, nmproduk, harga_produk, kuantitas, catatan } = req.body;

  try {
    const detailTransaksi = await DetailTransaksi.findByPk(id);
    if (!detailTransaksi) {
      return res.status(404).json({ error: 'Detail transaksi tidak ditemukan' });
    }

    // Cek stok produk jika kuantitas diubah
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    if (produk.stok < kuantitas) {
      return res.status(400).json({ error: 'Stok produk tidak mencukupi' });
    }

    detailTransaksi.id_produk = id_produk;
    detailTransaksi.nmproduk = nmproduk;
    detailTransaksi.harga_produk = harga_produk;
    detailTransaksi.kuantitas = kuantitas;
    detailTransaksi.catatan = catatan;

    await detailTransaksi.save();

    res.status(200).json(detailTransaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus detail transaksi
exports.deleteDetailTransaksi = async (req, res) => {
  const { id } = req.params;

  try {
    const detailTransaksi = await DetailTransaksi.findByPk(id);
    if (!detailTransaksi) {
      return res.status(404).json({ error: 'Detail transaksi tidak ditemukan' });
    }

    // Mengembalikan stok produk sebelum dihapus
    await Produk.increment('stok', {
      by: detailTransaksi.kuantitas,
      where: { id_produk: detailTransaksi.id_produk }
    });

    await detailTransaksi.destroy();
    res.status(200).json({ message: 'Detail transaksi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
