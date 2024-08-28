const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_lengkap: {
    type: DataTypes.STRING,
  },
  notlp: {
    type: DataTypes.STRING,
  },
  jk: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.ENUM('admin', 'kasir'),
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = User;
