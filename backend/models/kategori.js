const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Kategori = sequelize.define('Kategori', {
  id_kategori: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nmkategori: DataTypes.STRING,
}, {
  tableName: 'kategori',
  timestamps: false,
});

module.exports = Kategori;
