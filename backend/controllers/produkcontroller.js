const db = require("../models");
const { Produk, Kategori } = require("../models");

// Fungsi untuk menambahkan produk
exports.create = async (req, res) => {
  const { nmproduk, stok, foto_produk, satuan, merk, harga_beli, harga_jual, diskon, nama_kategori } = req.body;

  try {
    // Cari id_kategori berdasarkan nama kategori
    const kategori = await Kategori.findOne({ where: { nama_kategori } });

    // Jika kategori tidak ditemukan, return error
    if (!kategori) {
      return res.status(404).json({ error: "Kategori tidak ditemukan" });
    }

    // Buat produk baru dengan id_kategori yang ditemukan
    const newProduk = await Produk.create({
      nmproduk,
      stok,
      foto_produk,
      satuan,
      merk,
      harga_beli,
      harga_jual,
      diskon,
      id_kategori: kategori.id_kategori,
    });

    res.status(201).json(newProduk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk mendapatkan semua produk
// Untuk mendapatkan semua produk beserta relasi kategori dan pembelian
exports.findAll = (req, res) => {
  Produk.findAll({
    include: [
      {
        model: db.Kategori,
        as: "kategori",
      },
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mengambil produk.",
      });
    });
};

// Fungsi untuk mendapatkan produk berdasarkan ID
// Mendapatkan satu produk berdasarkan id beserta dan relasi di tambahkan id relasi nya
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produk.findByPk(id, {
    include: [
      {
        model: db.Kategori, // Relasi dengan tabel kategori
        as: "kategori",
      },
      {
        model: db.Pembelian, // Relasi dengan tabel pembelian
        as: "pembelian",
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Produk dengan id ${id} tidak ditemukan.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mengambil produk.",
      });
    });
};

// Fungsi untuk memperbarui produk
// Untuk memperbarui produk
exports.update = (req, res) => {
  const id = req.params.id;

  Produk.update(req.body, {
    where: { id_produk: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Produk berhasil diperbarui.",
        });
      } else {
        res.send({
          message: `Tidak dapat memperbarui produk dengan id ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat memperbarui produk.",
      });
    });
};

// Fungsi untuk menghapus produk
exports.delete = (req, res) => {
  const id = req.params.id;

  Produk.destroy({
    where: { id_produk: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Produk berhasil dihapus.",
        });
      } else {
        res.send({
          message: `Tidak dapat menghapus produk dengan id ${id}. Produk mungkin tidak ditemukan.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat menghapus produk.",
      });
    });
};
