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

module.exports = Produk;
