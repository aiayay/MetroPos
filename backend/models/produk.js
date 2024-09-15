const { v4: uuidv4 } = require('uuid'); // Mengimpor uuid

module.exports = (sequelize, DataTypes) => {
  const Produk = sequelize.define('Produk', {
    id_produk: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: uuidv4(),  
    },
    id_kategori: {
      type: DataTypes.UUID, 
      allowNull: false,
    },
    nmproduk: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    foto_produk: DataTypes.STRING,
    satuan: DataTypes.STRING,
    merk: DataTypes.STRING,
    harga_jual: DataTypes.INTEGER, // harga_beli telah dihapus
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
    Produk.hasMany(models.Pembelian, {
      foreignKey: 'id_produk',
      as: 'pembelian',
    });
  };
  

  return Produk;
};
