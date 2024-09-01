module.exports = (sequelize, DataTypes) => {
  const Produk = sequelize.define('Produk', {
    id_produk: {
      type: DataTypes.INTEGER, // Gunakan INTEGER jika id_produk adalah angka
      primaryKey: true,
      autoIncrement: true // Tambahkan ini jika id_produk auto-increment
    },
    id_kategori: DataTypes.INTEGER, // Pastikan tipe datanya sesuai dengan tabel
    id_pembelian: DataTypes.INTEGER,
    nmproduk: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    foto_produk: DataTypes.STRING,
    satuan: DataTypes.STRING,
    merk: DataTypes.STRING,
    harga_beli: DataTypes.INTEGER,
    harga_jual: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
  }, {
    tableName: 'produk',
    timestamps: false,
  });

  Produk.associate = (models) => {
    // Relasi one-to-many dengan Keranjang dan DetailTransaksi
    Produk.hasMany(models.Keranjang, {
      foreignKey: 'id_produk',
      as: 'keranjang',
    });
    Produk.hasMany(models.DetailTransaksi, {
      foreignKey: 'id_produk',
      as: 'detailTransaksi',
    });
    // Relasi many-to-one dengan Kategori dan Pembelian
    Produk.belongsTo(models.Kategori, {
      foreignKey: 'id_kategori',
      as: 'kategori',
    });
    Produk.belongsTo(models.Pembelian, {
      foreignKey: 'id_pembelian',
      as: 'pembelian',
    });
  };

  return Produk;
};
