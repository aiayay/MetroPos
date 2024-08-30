// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/dbconfig.js');

// const Member = sequelize.define('Member', {
//   id_member: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//   },
//   nmmember: DataTypes.STRING,
//   notlp: DataTypes.STRING,
//   alamat: DataTypes.STRING,
//   jk: DataTypes.STRING,
// }, {
//   tableName: 'member',
//   timestamps: false,
// });

// module.exports = Member;

// models/Member.js
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id_member: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_member: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_telepon: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'member',
    timestamps: false,
  });

  Member.associate = (models) => {
    // Relasi one-to-many dengan Keranjang dan Transaksi
    Member.hasMany(models.Keranjang, {
      foreignKey: 'id_member',
      as: 'keranjang',
    });
    Member.hasMany(models.Transaksi, {
      foreignKey: 'id_member',
      as: 'transaksi',
    });
  };

  return Member;
};
