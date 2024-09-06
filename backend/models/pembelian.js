module.exports = (sequelize, DataTypes) => {
  const Pembelian = sequelize.define('Pembelian', {
    id_pembelian: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true
    },
    id_produk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_supplier: {
      type: DataTypes.STRING,
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
