module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define('Keranjang', {
    id_keranjang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

  return Keranjang;
};
