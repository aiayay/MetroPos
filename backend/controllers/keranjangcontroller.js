const { Keranjang, Member, Produk } = require("../models");

// Mendapatkan semua item keranjang beserta produk yang terkait
exports.getAllKeranjang = async (req, res) => {
  try {
    const keranjang = await Keranjang.findAll({
      include: [
        { model: Member, as: 'member' },
        { model: Produk, as: 'produk' },
      ]
    });
    res.status(200).json(keranjang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan item keranjang berdasarkan ID
exports.getKeranjangById = async (req, res) => {
  const { id } = req.params;
  try {
    const keranjang = await Keranjang.findByPk(id, {
      include: [
        { model: Member, as: 'member' },
        { model: Produk, as: 'produk' },
      ]
    });
    if (!keranjang) {
      return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
    }
    res.status(200).json(keranjang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menambahkan produk ke keranjang (dengan kuantitas)
exports.createKeranjang = async (req, res) => {
  const { id_member, id_produk, kuantitas, catatan } = req.body; // Tambahkan catatan ke dalam req.body

  try {
    // Validasi input
    if (!id_produk || !kuantitas) {
      return res.status(400).json({ error: 'Data produk atau kuantitas tidak lengkap' });
    }

    // Periksa apakah produk ada
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ error: `Produk dengan id ${id_produk} tidak ditemukan` });
    }

    // Cek apakah keranjang sudah ada untuk member dan produk yang diberikan
    let keranjang = await Keranjang.findOne({
      where: {
        ...(id_member ? { id_member } : {}),  // Hanya tambahkan id_member jika ada
        id_produk
      }
    });

    // Hitung total_harga berdasarkan harga produk dan kuantitas
    const total_harga = produk.harga_jual * kuantitas;

    if (keranjang) {
      // Jika produk sudah ada di keranjang, tambahkan kuantitas
      keranjang.kuantitas += kuantitas;
      keranjang.total_harga = produk.harga_jual * keranjang.kuantitas;
      keranjang.catatan = catatan || keranjang.catatan; // Update catatan jika ada
      await keranjang.save();
    } else {
      // Buat entri baru di keranjang
      keranjang = await Keranjang.create({
        id_member: id_member || null,  
        id_produk,
        kuantitas,
        total_harga,
        catatan: catatan || null // Tambahkan catatan, null jika tidak ada
      });
    }

    res.status(201).json({ keranjang });
  } catch (error) {
    console.error('Error adding product to keranjang:', error);
    res.status(500).json({ error: error.message });
  }
};


// Memperbarui kuantitas produk di keranjang
exports.updateKeranjang = async (req, res) => {
  const { id } = req.params;
  const { id_produk, kuantitas, catatan } = req.body;

  try {
    const keranjang = await Keranjang.findByPk(id);

    if (!keranjang) {
      return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
    }

    // Periksa apakah produk ada
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Update kuantitas dan total_harga produk dalam keranjang
    keranjang.kuantitas = kuantitas;
    keranjang.total_harga = produk.harga_jual * kuantitas;

    // Cek apakah catatan baru diberikan
    if (catatan) {
      keranjang.catatan = catatan; // Update catatan jika ada
    } else {
      keranjang.catatan = null; // Hapus catatan jika tidak ada
    }

    await keranjang.save();

    res.status(200).json({ message: 'Keranjang berhasil diperbarui', keranjang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Menghapus keranjang
exports.deleteKeranjang = async (req, res) => {
  const { id } = req.params;

  try {
    const keranjang = await Keranjang.findByPk(id);

    if (!keranjang) {
      return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
    }

    await keranjang.destroy();
    res.status(200).json({ message: 'Keranjang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
