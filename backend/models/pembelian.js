const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Pembelian = sequelize.define('Pembelian', {
  id_pembelian: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_produk: DataTypes.STRING,
  kuantitas: DataTypes.INTEGER,
  id_supplier: DataTypes.STRING,
  tanggal: DataTypes.DATEONLY,
  harga_beli: DataTypes.INTEGER,
}, {
  tableName: 'pembelian',
  timestamps: false,
});

module.exports = Pembelian;
