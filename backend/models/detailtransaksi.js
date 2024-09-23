const { v4: uuidv4 } = require('uuid'); // Mengimpor uuid
const sequelize = require('../config/dbconfig.js');
module.exports = (sequelize, DataTypes) => {
  const DetailTransaksi = sequelize.define('DetailTransaksi', {
    id_detailtrans: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(), // Menggunakan UUID secara otomatis
    },
    id_transaksi: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Transaksi', // Sesuaikan dengan nama model yang tepat
        key: 'id_transaksi',
      },
    },
    id_produk: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Produk', // Sesuaikan dengan nama model yang tepat
        key: 'id_produk',
      },
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
    catatan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'detailtransaksi',
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
