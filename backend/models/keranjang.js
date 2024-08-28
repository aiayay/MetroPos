const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Keranjang = sequelize.define('Keranjang', {
  id_keranjang: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_produk: DataTypes.STRING,
  id_member: DataTypes.STRING,
  kuantitas: DataTypes.INTEGER,
  total_bayar: DataTypes.INTEGER,
}, {
  tableName: 'keranjang',
  timestamps: false,
});

module.exports = Keranjang;

//aini
