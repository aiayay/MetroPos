const db = require("../models");
const { Produk, Kategori, Pembelian } = require("../models");
const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder penyimpanan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Penamaan file dengan timestamp
  }
});

// Filter untuk hanya menerima file gambar
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Hanya gambar dengan format .jpeg, .jpg, atau .png yang diizinkan!'), false);
  }
};

// Middleware untuk upload file
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Fungsi untuk menambahkan produk dengan upload foto
exports.create = async (req, res) => {
  upload.single('foto_produk')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Terjadi kesalahan saat mengupload gambar.' });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { nmproduk, stok, satuan, merk, harga_beli, harga_jual, diskon, nama_kategori } = req.body;
    
    // URL lengkap gambar
    const foto_produk = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    try {
      // Cari id_kategori berdasarkan nama kategori
      const kategori = await Kategori.findOne({ where: { nama_kategori } });

      if (!kategori) {
        return res.status(404).json({ error: "Kategori tidak ditemukan" });
      }

      // Buat produk baru dengan URL gambar
      const newProduk = await Produk.create({
        nmproduk,
        stok,
        foto_produk, // URL lengkap gambar yang diupload
        satuan,
        merk,
        harga_beli,
        harga_jual,
        diskon,
        id_kategori: kategori.id_kategori
      });

      res.status(201).json(newProduk);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};


// Fungsi untuk mendapatkan semua produk beserta kategori
exports.findAll = (req, res) => {
  Produk.findAll({
    include: [
      {
        model: Kategori,
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

// Fungsi untuk mendapatkan produk berdasarkan ID beserta kategori dan pembelian
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produk.findByPk(id, {
    include: [
      {
        model: Kategori, // Relasi dengan tabel kategori
        as: "kategori",
      },
      {
        model: Pembelian, // Relasi dengan tabel pembelian
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
          message: `Tidak dapat memperbarui produk dengan id ${id}. Produk mungkin tidak ditemukan atau tidak ada perubahan data.`,
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

exports.findByCategory = async (req, res) => {
  const kategori = req.params.kategori; // Mengambil kategori dari parameter

  try {
    const produkList = await Produk.findAll({
      include: [
        {
          model: Kategori,
          as: "kategori",
          where: { nama_kategori: kategori }, // Menyaring berdasarkan nama kategori
        },
      ],
    });

    if (produkList.length > 0) {
      res.send(produkList);
    } else {
      res.status(404).send({
        message: `Tidak ada produk ditemukan untuk kategori ${kategori}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Terjadi kesalahan saat mengambil produk.",
    });
  }
};