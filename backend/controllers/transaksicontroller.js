const { Transaksi, DetailTransaksi, User, Member } = require('../models');

// Mendapatkan semua transaksi
exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll({
      include: [
        { model: DetailTransaksi, as: 'detailTransaksi' },
        { model: User, as: 'user' },
        { model: Member, as: 'member' },
      ]
    });
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan transaksi berdasarkan ID
exports.getTransaksiById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await Transaksi.findByPk(id, {
      include: [
        { model: DetailTransaksi, as: 'detailTransaksi' },
        { model: User, as: 'user' },
        { model: Member, as: 'member' },
      ]
    });
    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat transaksi baru
exports.createTransaksi = async (req, res) => {
  const { id_member, id_user, nama_kasir, nama_member, tanggal, detailTransaksi } = req.body;
  try {
    const newTransaksi = await Transaksi.create({
      id_member,
      id_user,
      nama_kasir,
      nama_member,
      tanggal,
    });

    // Jika ada detailTransaksi, simpan juga detailnya
    if (detailTransaksi && detailTransaksi.length > 0) {
      for (const detail of detailTransaksi) {
        await DetailTransaksi.create({
          id_transaksi: newTransaksi.id_transaksi,
          id_produk: detail.id_produk,
          kuantitas: detail.kuantitas,
          total_harga: detail.total_harga,
          potongan: detail.potongan,
        });
      }
    }

    res.status(201).json(newTransaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui transaksi
exports.updateTransaksi = async (req, res) => {
  const { id } = req.params;
  const { id_member, id_user, nama_kasir, nama_member, tanggal } = req.body;
  try {
    const transaksi = await Transaksi.findByPk(id);
    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }

    transaksi.id_member = id_member;
    transaksi.id_user = id_user;
    transaksi.nama_kasir = nama_kasir;
    transaksi.nama_member = nama_member;
    transaksi.tanggal = tanggal;

    await transaksi.save();
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus transaksi
exports.deleteTransaksi = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await Transaksi.findByPk(id);
    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }

    await transaksi.destroy();
    res.status(200).json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
