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

Keranjang.associate = (models) => {
  // Relasi many-to-one dengan Member dan Produk
  Keranjang.belongsTo(models.Member, {
    foreignKey: 'id_member',
    as: 'member',
  });
  Keranjang.belongsTo(models.Produk, {
    foreignKey: 'id_produk',
    as: 'produk',
  });
};

module.exports = Keranjang;

//aini
