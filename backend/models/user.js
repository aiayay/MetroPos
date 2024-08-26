const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  nama_lengkap: DataTypes.STRING,
  notlp: DataTypes.STRING,
  jk: DataTypes.STRING,
  level: DataTypes.ENUM('admin', 'kasir'),
  foto: DataTypes.STRING,
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
