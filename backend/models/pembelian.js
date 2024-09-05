module.exports = (sequelize, DataTypes) => {
  const Pembelian = sequelize.define('Pembelian', {
    id_pembelian: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    id_produk: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_supplier: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    harga_beli: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'pembelian',
    timestamps: false,
  });

  Pembelian.associate = (models) => {
    Pembelian.belongsTo(models.Produk, {
      foreignKey: 'id_produk',
      as: 'produk',
    });
  };

  return Pembelian;
};
