

module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define('Keranjang', {
    id_keranjang: {
      type: DataTypes.STRING, // Ubah ke STRING
      primaryKey: true,
      allowNull: false,
    },
    id_produk: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    id_member: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_bayar: {
      type: DataTypes.INTEGER, // Ubah ke INTEGER
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
