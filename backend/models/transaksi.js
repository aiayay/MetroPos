const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Transaksi = sequelize.define('Transaksi', {
  id_transaksi: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_member: DataTypes.STRING,
  id_user: DataTypes.STRING,
  nmkasir: DataTypes.STRING,
  nmmember: DataTypes.STRING,
  tanggal: DataTypes.DATEONLY,
}, {
  tableName: 'transaksi',
  timestamps: false,
});

module.exports = Transaksi;
