// models/DetailTransaksi.js

module.exports = (sequelize, DataTypes) => {
  const DetailTransaksi = sequelize.define('DetailTransaksi', {
    id_detailtrans: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_transaksi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nmproduk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga_produk: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    potongan: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total_bayar: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    metode_bayar: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'detail_transaksi',
    timestamps: false,
  });

  // Definisi hubungan
  DetailTransaksi.associate = (models) => {
    DetailTransaksi.belongsTo(models.Transaksi, {
      foreignKey: 'id_transaksi',
      as: 'transaksi',
    });
    DetailTransaksi.belongsTo(models.Produk, {
      foreignKey: 'id_produk',
      as: 'produk',
    });
  };

  return DetailTransaksi;
};
