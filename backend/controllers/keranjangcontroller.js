const { Keranjang, Member, Produk } = require('../models');

// Mendapatkan semua item keranjang
exports.getAllKeranjang = async (req, res) => {
  try {
    const keranjang = await Keranjang.findAll({
      include: [
        { model: Member, as: 'member' },  // Relasi ke Member
        { model: Produk, as: 'produk' },  // Relasi ke Produk
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

// Menambahkan item ke keranjang

exports.createKeranjang = async (req, res) => {
  const { id_produk, id_member, kuantitas, total_bayar } = req.body;
  try {
    // Validasi input
    if (!id_produk || !kuantitas || !total_bayar) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    // Periksa apakah produk dan member ada
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    const member = id_member ? await Member.findByPk(id_member) : null;
    if (id_member && !member) {
      return res.status(404).json({ error: 'Member tidak ditemukan' });
    }

    const newKeranjang = await Keranjang.create({
      id_produk,
      id_member,
      kuantitas,
      total_bayar
    });

    res.status(201).json(newKeranjang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Memperbarui item keranjang
exports.updateKeranjang = async (req, res) => {
  const { id } = req.params;
  const { id_produk, id_member, kuantitas, total_bayar } = req.body;
  try {
    const keranjang = await Keranjang.findByPk(id);
    if (!keranjang) {
      return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
    }

    // Validasi input
    if (!id_produk || !kuantitas || !total_bayar) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    // Periksa apakah produk dan member ada
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    const member = id_member ? await Member.findByPk(id_member) : null;
    if (id_member && !member) {
      return res.status(404).json({ error: 'Member tidak ditemukan' });
    }

    // Update data
    keranjang.id_produk = id_produk;
    keranjang.id_member = id_member;
    keranjang.kuantitas = kuantitas;
    keranjang.total_bayar = total_bayar;

    await keranjang.save();
    res.status(200).json(keranjang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus item keranjang
exports.deleteKeranjang = async (req, res) => {
  const { id } = req.params;
  try {
    const keranjang = await Keranjang.findByPk(id);
    if (!keranjang) {
      return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
    }

    await keranjang.destroy();
    res.status(200).json({ message: 'Item keranjang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
