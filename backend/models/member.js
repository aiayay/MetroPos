const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Member = sequelize.define('Member', {
  id_member: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nmmember: DataTypes.STRING,
  notlp: DataTypes.STRING,
  alamat: DataTypes.STRING,
  jk: DataTypes.STRING,
}, {
  tableName: 'member',
  timestamps: false,
});

module.exports = Member;
