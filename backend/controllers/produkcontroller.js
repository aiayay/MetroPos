const db = require("../models");
const Produk = db.Produk; // Pastikan nama ini sesuai dengan nama model yang didefinisikan di file model

// Fungsi untuk menambahkan produk
exports.create = async (req, res) => {
  const { id_kategori, nmproduk, stok, foto_produk, satuan, merk, harga_beli, harga_jual, diskon } = req.body;

  if (!nmproduk || !id_kategori) {
    return res.status(400).send({
      message: "Nama produk dan ID kategori harus diisi!",
    });
  }

  try {
    // Memastikan ID kategori yang diberikan valid
    const kategori = await db.Kategori.findByPk(id_kategori);
    if (!kategori) {
      return res.status(400).send({
        message: "ID kategori tidak valid atau tidak ditemukan.",
      });
    }

    // Menyiapkan data produk
    const newProduk = {
      id_kategori,
      nmproduk,
      stok,
      foto_produk: req.file ? req.file.filename : foto_produk,
      satuan,
      merk,
      harga_beli,
      harga_jual,
      diskon,
    };

    // Menyimpan produk ke database
    const produk = await Produk.create(newProduk);
    res.status(201).send({
      message: "Produk berhasil dibuat.",
      data: produk,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat membuat produk.",
    });
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
