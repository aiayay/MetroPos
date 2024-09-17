const { Keranjang, Member, Produk, KeranjangProduk } = require('../models');

// Mendapatkan semua item keranjang beserta produk yang terkait
exports.getAllKeranjang = async (req, res) => {
  try {
    const keranjang = await Keranjang.findAll({
      include: [
        { model: Member, as: 'member' },  // Relasi ke Member
        {
          model: Produk,
          as: 'produk',  // Relasi many-to-many dengan Produk
          through: { attributes: ['kuantitas'] },  // Menampilkan kuantitas dari tabel pivot
        },
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
        {
          model: Produk,
          as: 'produk',
          through: { attributes: ['kuantitas'] },
        },
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

// Menambahkan produk ke keranjang
exports.createKeranjang = async (req, res) => {
  const { id_member, produk } = req.body;
  
  try {
    // Validasi input
    if (!produk || produk.length === 0) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    // Periksa apakah member ada
    const member = id_member ? await Member.findByPk(id_member) : null;
    if (id_member && !member) {
      return res.status(404).json({ error: 'Member tidak ditemukan' });
    }

    // Buat keranjang baru
    const keranjang = await Keranjang.create({
      id_member
    });

    // Loop melalui produk dan masukkan ke keranjang
    const keranjangItems = [];
    for (let item of produk) {
      const { id_produk, kuantitas } = item;
      
      // Periksa apakah produk ada
      const produkData = await Produk.findByPk(id_produk);
      if (!produkData) {
        return res.status(404).json({ error: `Produk dengan id ${id_produk} tidak ditemukan` });
      }

      // Tambahkan item ke keranjang
      const newKeranjangProduk = await KeranjangProduk.create({
        id_keranjang: keranjang.id_keranjang,
        id_produk,
        kuantitas
      });

      keranjangItems.push(newKeranjangProduk);
    }

    res.status(201).json({ keranjang, produk: keranjangItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Memperbarui item keranjang (misalnya kuantitas produk)
exports.updateKeranjang = async (req, res) => {
  const { id } = req.params;
  const { id_produk, kuantitas } = req.body;
  try {
    const keranjang = await Keranjang.findByPk(id);

    if (!keranjang) {
      return res.status(404).json({ error: 'Keranjang tidak ditemukan' });
    }

    // Validasi input
    if (!id_produk || !kuantitas) {
      return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    // Periksa apakah produk ada
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Perbarui kuantitas produk dalam keranjang melalui tabel pivot
    const keranjangProduk = await KeranjangProduk.findOne({
      where: { id_keranjang: id, id_produk }
    });

    if (!keranjangProduk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan dalam keranjang' });
    }

    keranjangProduk.kuantitas = kuantitas;
    await keranjangProduk.save();

    res.status(200).json({ message: 'Keranjang berhasil diperbarui', keranjang });
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

    // Hapus semua produk yang terkait dengan keranjang ini
    await KeranjangProduk.destroy({ where: { id_keranjang: id } });
    
    // Hapus keranjang itu sendiri
    await keranjang.destroy();

    res.status(200).json({ message: 'Keranjang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
