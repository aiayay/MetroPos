const { v4: uuidv4 } = require('uuid'); // Mengimpor uuid

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
