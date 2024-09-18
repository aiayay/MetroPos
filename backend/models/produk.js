const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Produk = sequelize.define('Produk', {
    id_produk: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    id_kategori: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nmproduk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto_produk: {
      type: DataTypes.STRING,
    },
    satuan: {
      type: DataTypes.STRING,
    },
    merk: {
      type: DataTypes.STRING,
    },
    harga_jual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diskon: {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'produk',
    timestamps: false,
  });

  Produk.associate = (models) => {
    Produk.hasMany(models.Keranjang, {
      foreignKey: 'id_produk',
      as: 'keranjang',
    });

    Produk.belongsTo(models.Kategori, {
      foreignKey: 'id_kategori',
      as: 'kategori',
    });

    Produk.hasMany(models.DetailTransaksi, {
      foreignKey: 'id_produk',
      as: 'detailTransaksi',
    });

    Produk.hasMany(models.Pembelian, {
      foreignKey: 'id_produk',
      as: 'pembelian',
    });
  };

  return Produk;
};
