// models/DetailTransaksi.js
module.exports = (sequelize, DataTypes) => {
  const Detail_Transaksi = sequelize.define('Detail_Transaksi', {
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
  Detail_Transaksi.associate = (models) => {
    // Hubungan dengan Transaksi (One-to-Many)
    Detail_Transaksi.belongsTo(models.Transaksi, {
      foreignKey: 'id_transaksi',
      as: 'transaksi',
      onDelete: 'CASCADE',
    });

    // Hubungan dengan Produk (Many-to-One)
    Detail_Transaksi.belongsTo(models.Produk, {
      foreignKey: 'id_produk',
      as: 'produk',
      onDelete: 'CASCADE',
    });

    // Hubungan dengan Member melalui Transaksi (optional)
    Detail_Transaksi.belongsTo(models.Member, {
      foreignKey: 'id_member',
      as: 'member',
      onDelete: 'SET NULL',
      allowNull: true
    });

    // Hubungan dengan Diskon (Jika ada informasi diskon langsung)
    Detail_Transaksi.belongsTo(models.Diskon, {
      foreignKey: 'id_diskon',
      as: 'diskon',
      allowNull: true
    });
  };

  return Detail_Transaksi;
};
