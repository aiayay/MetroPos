const { Transaksi, DetailTransaksi, Produk, User, Member } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Mendapatkan semua transaksi (termasuk detail transaksi)
exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll({
      include: [
        {
          model: DetailTransaksi,
          as: 'detailTransaksi',
          include: [{ model: Produk, as: 'produk' }]
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] }
        },
        { model: Member, as: 'member' }
      ]
    });
    res.status(200).json(transaksi);
  } catch (error) {
    console.error("Error getting all transaksi:", error); // Tambahkan log kesalahan
    res.status(500).json({ error: error.message });
  }
};

// Membuat transaksi baru (termasuk detail transaksi)
exports.createTransaksi = async (req, res) => {
  const { id_member, id_user, nama_kasir, nama_member, total_bayar, bayar, potongan, metode_bayar, tanggal, detailTransaksi } = req.body;

  // Validasi input
  if (!id_user || !nama_kasir || !total_bayar || !bayar || !metode_bayar || !tanggal) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }

  try {
    // Buat transaksi baru di tabel Transaksi
    const newTransaksi = await Transaksi.create({
      id_transaksi: uuidv4(),
      id_member,
      id_user,
      nama_kasir,
      nama_member,
      total_bayar,
      bayar,
      potongan,
      metode_bayar,
      tanggal
    });

    // Jika ada detail transaksi (array of products)
    if (detailTransaksi && detailTransaksi.length > 0) {
      for (const detail of detailTransaksi) {
        const produk = await Produk.findByPk(detail.id_produk);
        if (!produk) {
          return res.status(404).json({ error: `Produk dengan ID ${detail.id_produk} tidak ditemukan` });
        }

        // Cek stok produk
        if (produk.stok < detail.kuantitas) {
          return res.status(400).json({ error: `Stok produk ${produk.nmproduk} tidak mencukupi` });
        }

        // Cek apakah detail transaksi dengan produk yang sama sudah ada
        const existingDetail = await DetailTransaksi.findOne({
          where: {
            id_transaksi: newTransaksi.id_transaksi,
            id_produk: detail.id_produk
          }
        });

        if (existingDetail) {
          // Jika sudah ada, update kuantitas dan total_harga
          const newQuantity = existingDetail.kuantitas + detail.kuantitas;
          const newTotalPrice = newQuantity * detail.harga_produk;

          await existingDetail.update({
            kuantitas: newQuantity,
            total_harga: newTotalPrice
          });
        } else {
          // Jika belum ada, buat detail transaksi baru
          await DetailTransaksi.create({
            id_detailtrans: uuidv4(),
            id_transaksi: newTransaksi.id_transaksi,
            id_produk: detail.id_produk,
            nmproduk: detail.nmproduk,
            harga_produk: detail.harga_produk,
            kuantitas: detail.kuantitas,
            total_harga: detail.total_harga,
            potongan: detail.potongan
          });
        }

        // Kurangi stok produk
        await Produk.decrement('stok', {
          by: detail.kuantitas,
          where: { id_produk: detail.id_produk }
        });
      }
    }

    res.status(201).json({
      message: "Transaksi dan detail transaksi berhasil dibuat",
      transaksi: newTransaksi,
      detailTransaksi
    });
  } catch (error) {
    console.error("Error creating transaksi:", error);
    res.status(500).json({ error: error.message });
  }
};



// Memperbarui transaksi
exports.updateTransaksi = async (req, res) => {
  const { id } = req.params;
  const { id_member, id_user, nama_kasir, nama_member, total_bayar, bayar, potongan, metode_bayar, tanggal } = req.body;

  try {
    const transaksi = await Transaksi.findByPk(id);
    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }

    // Update data transaksi
    transaksi.id_member = id_member;
    transaksi.id_user = id_user;
    transaksi.nama_kasir = nama_kasir;
    transaksi.nama_member = nama_member;
    transaksi.total_bayar = total_bayar; // Pastikan 
    transaksi.bayar = bayar;
    transaksi.potongan = potongan;
    transaksi.metode_bayar = metode_bayar;
    transaksi.tanggal = tanggal;

    await transaksi.save();
    res.status(200).json(transaksi);
  } catch (error) {
    console.error("Error updating transaksi:", error); // Tambahkan log kesalahan
    res.status(500).json({ error: error.message });
  }
};

// Menghapus transaksi dan detail transaksi terkait
exports.deleteTransaksi = async (req, res) => {
  const { id } = req.params;

  try {
    const transaksi = await Transaksi.findByPk(id);
    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }

    // Hapus detail transaksi terkait
    await DetailTransaksi.destroy({
      where: { id_transaksi: id }
    });

    // Hapus transaksi
    await transaksi.destroy();
    res.status(200).json({ message: 'Transaksi dan detail transaksi berhasil dihapus' });
  } catch (error) {
    console.error("Error deleting transaksi:", error); 
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan transaksi berdasarkan ID (termasuk detail transaksi)
exports.getTransaksiById = async (req, res) => {
  const { id } = req.params; 
  try {
    const transaksi = await Transaksi.findByPk(id, {
      include: [
        {
          model: DetailTransaksi,
          as: 'detailTransaksi',
          include: [{ model: Produk, as: 'produk' }]
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] }
        },
        { model: Member, as: 'member' }
      ]
    });

    
    if (!transaksi) {
      return res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }
    
    
    res.status(200).json(transaksi);
  } catch (error) {
    console.error("Error getting transaksi by ID:", error); 
    res.status(500).json({ error: error.message });
  }
};
