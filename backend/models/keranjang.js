const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define('Keranjang', {
    id_keranjang: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,  // Perbaiki defaultValue menjadi fungsi
      primaryKey: true
    },
    id_member: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Member',
        key: 'id_member'
      }
    }
  }, {});

  Keranjang.associate = (models) => {
    Keranjang.belongsTo(models.Member, {
      foreignKey: 'id_member',
      as: 'member'
    });
    Keranjang.belongsToMany(models.Produk, {
      through: models.KeranjangProduk,
      foreignKey: 'id_keranjang',
      otherKey: 'id_produk',
      as: 'produk'
    });
  };

  return Keranjang;
};
