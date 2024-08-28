const db = require("../models");
const Product = db.product;

// image Upload
const multer = require('multer')
const path = require('path')

exports.create = (req, res) => {
  if (!req.body.nama_produk) {
    return res.status(400).send({
      message: "Nama produk tidak boleh kosong!"
    });
  }

  const product = {
    
    id_kategori: req.body.id_kategori,
    id_pembelian: req.body.id_pembelian,
    nama_produk: req.body.nama_produk,
    stok: req.body.stok,
    foto_produk: req.body.foto_produk,
    satuan: req.body.satuan,
    merk: req.body.merk,
    harga_beli: req.body.harga_beli,
    harga_jual: req.body.harga_jual,
    diskon: req.body.diskon,
    keterangan: req.body.keterangan
  };

  Product.create(product)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat membuat produk."
      });
    });
};

exports.findAll = (req, res) => {
  Product.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mengambil produk."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Produk dengan id ${id} tidak ditemukan.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat mengambil produk."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id_produk: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produk berhasil diperbarui."
        });
      } else {
        res.send({
          message: `Tidak dapat memperbarui produk dengan id ${id}. Produk mungkin tidak ditemukan atau data request kosong.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat memperbarui produk."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id_produk: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produk berhasil dihapus."
        });
      } else {
        res.send({
          message: `Tidak dapat menghapus produk dengan id ${id}. Produk mungkin tidak ditemukan.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat menghapus produk."
      });
    });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'foto_produk')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    addproduct,
    getAllproducts,
    getOneproduct,
    updateProduct,
    deleteproduct,
    getpublishedproduct,
}