module.exports = (sequelize, DataTypes) => {
  const Produk = sequelize.define('Produk', {
    id_produk: {
      type: DataTypes.STRING, 
      primaryKey: true,
    },
    id_kategori: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    id_pembelian: {
      type: DataTypes.STRING, 
      allowNull: true
    },
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
    Produk.hasMany(models.Keranjang, {
      foreignKey: 'id_produk',
      as: 'keranjang',
    });
    Produk.hasMany(models.DetailTransaksi, {
      foreignKey: 'id_produk',
      as: 'detailTransaksi',
    });
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
