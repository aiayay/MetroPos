const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Supplier = sequelize.define('Supplier', {
  id_supplier: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nmsupplier: DataTypes.STRING,
  alamat: DataTypes.STRING,
  notlp: DataTypes.STRING,
}, {
  tableName: 'supplier',
  timestamps: false,
});

module.exports = Supplier;
