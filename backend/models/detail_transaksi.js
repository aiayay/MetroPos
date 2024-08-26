const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const DetailTransaksi = sequelize.define('DetailTransaksi', {
  id_detailtrans: {
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

module.exports = DetailTransaksi;
