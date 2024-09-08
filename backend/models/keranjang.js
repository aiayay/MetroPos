const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define('Keranjang', {
    id_keranjang: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(), // Otomatis generate UUID jika tidak diisi
      primaryKey: true,
      allowNull: false
    },
    id_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_produk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_bayar: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Keranjang.associate = (models) => {
    Keranjang.belongsTo(models.Member, {
      foreignKey: 'id_member',
      as: 'member'
    });
    Keranjang.belongsTo(models.Produk, {
      foreignKey: 'id_produk',
      as: 'produk'
    });
  };

  return Keranjang;
};
