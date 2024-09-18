const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Produk = sequelize.define('Produk', {
    id_produk: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(), // Memastikan UUID di-generate untuk setiap produk baru
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

  // Relasi
  Produk.associate = (models) => {
    // Relasi dengan tabel `Keranjang`
    Produk.hasMany(models.Keranjang, {
      foreignKey: 'id_produk',
      as: 'keranjang', // Menghubungkan produk dengan keranjang tanpa tabel pivot
    });

    // Relasi dengan `DetailTransaksi`
    Produk.hasMany(models.DetailTransaksi, {
      foreignKey: 'id_produk',
      as: 'detailTransaksi',
    });

    // Relasi dengan `Kategori`
    Produk.belongsTo(models.Kategori, {
      foreignKey: 'id_kategori',
      as: 'kategori',
    });

    // Relasi dengan `Pembelian`
    Produk.hasMany(models.Pembelian, {
      foreignKey: 'id_produk',
      as: 'pembelian',
    });
  };

  return Produk;
};
