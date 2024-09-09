const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pembelian = sequelize.define('Pembelian', {
    id_pembelian: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    id_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'produk',
        key: 'id_produk',
      },
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_supplier: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'supplier',
        key: 'id_supplier',
      },
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    harga_beli: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    tableName: 'pembelian',
    timestamps: false,
  });

  Pembelian.associate = (models) => {
    Pembelian.belongsTo(models.Produk, {
      foreignKey: 'id_produk',
      as: 'produk',
    });
    Pembelian.belongsTo(models.Supplier, {
      foreignKey: 'id_supplier',
      as: 'supplier',
    });
  };

  return Pembelian;
};
