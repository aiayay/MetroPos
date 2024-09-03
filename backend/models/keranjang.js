module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define('Keranjang', {
    id_keranjang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_member: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_bayar: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    tableName: 'keranjang',
    timestamps: false,
  });

  // Definisi hubungan
  Keranjang.associate = (models) => {
    Keranjang.belongsTo(models.Member, {
      foreignKey: 'id_member',
      as: 'member',
    });
    Keranjang.belongsTo(models.Produk, {
      foreignKey: 'id_produk',
      as: 'produk',
    });
  };

  return Keranjang;
};
