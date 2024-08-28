const {sequelize, DataTypes } = require ('sequelize');
const dbconfig = require ('../config/dbconfig.js');

const Detail_Transaksi = sequelize.define('Detail_Transaksi', {
  id_detail_transaksi: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_transaksi: DataTypes.STRING,
  id_produk: DataTypes.STRING,
  nmproduk: DataTypes.STRING,
  harga_produk: DataTypes.INTEGER,
  catatan: DataTypes.TEXT,
  kuantitas: DataTypes.INTEGER,
  total_harga: DataTypes.INTEGER,
  total_bayar: DataTypes.INTEGER,
  bayar: DataTypes.INTEGER,
  potongan: DataTypes.INTEGER,
  metode_bayar: DataTypes.STRING,
}, {
  tableName: 'detail_transaksi',
  timestamps: false,
});

module.exports = Detail_Transaksi;
