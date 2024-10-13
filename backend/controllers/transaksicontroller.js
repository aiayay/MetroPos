const { Transaksi, DetailTransaksi, Produk, User, Member, sequelize } = require('../models');
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
    console.error("Error getting all transaksi:", error);
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

  // Validasi pembayaran (bayar harus >= total_bayar)
  if (bayar < total_bayar) {
    return res.status(400).json({ error: "Jumlah pembayaran tidak mencukupi." });
  }

  const transaction = await sequelize.transaction();
  try {
    // Cek apakah sudah ada transaksi yang sama pada hari yang sama dengan id_user dan id_member
    let transaksi = await Transaksi.findOne({
      where: {
        id_user,
        id_member,
        tanggal,
        metode_bayar
      }
    }, { transaction });

    // Jika belum ada, buat transaksi baru
    if (!transaksi) {
      transaksi = await Transaksi.create({
        id_transaksi: uuidv4(),
        id_member,
        id_user,
        nama_kasir,
        nama_member,
        total_bayar,
        bayar,
        potongan,
        metode_bayar,
        tanggal,
        status: 'pending' // Status awal adalah 'pending'
      }, { transaction });
    }

    // Jika detailTransaksi ada dan lebih dari 0
    if (detailTransaksi && detailTransaksi.length > 0) {
      for (const detail of detailTransaksi) {
        const produk = await Produk.findByPk(detail.id_produk, { transaction });
        if (!produk) {
          await transaction.rollback();
          return res.status(404).json({ error: `Produk dengan ID ${detail.id_produk} tidak ditemukan` });
        }

        // Cek stok produk
        if (produk.stok < detail.kuantitas) {
          await transaction.rollback();
          return res.status(400).json({ error: `Stok produk ${produk.nmproduk} tidak mencukupi` });
        }

        // Cek apakah produk sudah ada di detail transaksi yang ada
        let existingDetail = await DetailTransaksi.findOne({
          where: {
            id_transaksi: transaksi.id_transaksi,
            id_produk: detail.id_produk
          }
        }, { transaction });

        if (existingDetail) {
          // Jika produk sudah ada, update kuantitas dan total_harga
          const newQuantity = existingDetail.kuantitas + detail.kuantitas;
          const newTotalPrice = newQuantity * detail.harga_produk;

          await existingDetail.update({
            kuantitas: newQuantity,
            total_harga: newTotalPrice
          }, { transaction });
        } else {
          // Jika produk belum ada, buat detail transaksi baru
          await DetailTransaksi.create({
            id_detailtrans: uuidv4(),
            id_transaksi: transaksi.id_transaksi,
            id_produk: detail.id_produk,
            nmproduk: detail.nmproduk,
            harga_produk: detail.harga_produk,
            kuantitas: detail.kuantitas,
            total_harga: detail.total_harga,
            potongan: detail.potongan,
            catatan: detail.catatan
          }, { transaction });
        }

        // Kurangi stok produk
        await Produk.decrement('stok', {
          by: detail.kuantitas,
          where: { id_produk: detail.id_produk },
          transaction
        });
      }

      // Update total bayar dalam transaksi setelah detail ditambahkan
      const updatedTotal = await DetailTransaksi.sum('total_harga', {
        where: { id_transaksi: transaksi.id_transaksi },
        transaction
      });

      await transaksi.update({ total_bayar: updatedTotal }, { transaction });
    }

    // Update status transaksi menjadi 'selesai' setelah pembayaran berhasil
    await transaksi.update({ status: 'selesai' }, { transaction });

    // Commit semua perubahan
    await transaction.commit();

    res.status(201).json({
      message: "Transaksi berhasil diselesaikan",
      transaksi,
      detailTransaksi
    });
  } catch (error) {
    await transaction.rollback();
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
    transaksi.total_bayar = total_bayar;
    transaksi.bayar = bayar;
    transaksi.potongan = potongan;
    transaksi.metode_bayar = metode_bayar;
    transaksi.tanggal = tanggal;

    await transaksi.save();
    res.status(200).json(transaksi);
  } catch (error) {
    console.error("Error updating transaksi:", error);
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
