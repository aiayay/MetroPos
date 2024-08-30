const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Produk = sequelize.define('Produk', {
  id_produk: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_kategori: DataTypes.STRING,
  id_pembelian: DataTypes.STRING,
  nmproduk: DataTypes.STRING,
  stok: DataTypes.INTEGER,
  foto_produk: DataTypes.STRING,
  satuan: DataTypes.STRING,
  merk: DataTypes.STRING,
  harga_beli: DataTypes.INTEGER,
  harga_jual: DataTypes.INTEGER,
  diskon: DataTypes.INTEGER,
}, {
  tableName: 'produk',
  timestamps: false,
});

Produk.associate = (models) => {
  // Relasi one-to-many dengan Keranjang dan DetailTransaksi
  Produk.hasMany(models.Keranjang, {
    foreignKey: 'id_produk',
    as: 'keranjang',
  });
  Produk.hasMany(models.DetailTransaksi, {
    foreignKey: 'id_produk',
    as: 'detailTransaksi',
  });
  // Relasi many-to-one dengan Kategori dan Pembelian
  Produk.belongsTo(models.Kategori, {
    foreignKey: 'id_kategori',
    as: 'kategori',
  });
  Produk.belongsTo(models.Pembelian, {
    foreignKey: 'id_pembelian',
    as: 'pembelian',
  });
};


module.exports = Produk;


// models/Produk.js
// module.exports = (sequelize, DataTypes) => {
//   const Produk = sequelize.define('Produk', {
//     id_produk: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     nmproduk: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     stok: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     harga_jual: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     diskon: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     }
//   }, {
//     tableName: 'produk',
//     timestamps: false,
//   });

//   // Definisi hubungan
//   Produk.associate = (models) => {
//     // Many-to-One dengan DetailTransaksi
//     Produk.hasMany(models.DetailTransaksi, {
//       foreignKey: 'id_produk',
//       as: 'detailTransaksi',
//     });
//   };

//   return Produk;
// };

