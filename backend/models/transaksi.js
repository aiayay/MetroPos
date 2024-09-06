module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    id_transaksi: {
      type: DataTypes.STRING, // Ganti dengan STRING jika id_transaksi adalah VARCHAR di database
      primaryKey: true,
      allowNull: false,
    },
    id_member: {
      type: DataTypes.STRING, // Ganti dengan STRING jika id_member adalah VARCHAR di database
      allowNull: false,
      references: {
        model: 'member', // Pastikan nama model adalah 'User' sesuai dengan file user.js
        key: 'id_member',
      },
    },
    id_user: {
      type: DataTypes.STRING, // Ganti dengan STRING jika id_user adalah VARCHAR di database
      allowNull: false,
      references: {
        model: 'user', // Pastikan nama model adalah 'User' sesuai dengan file user.js
        key: 'id_user',
      },
    },
    nama_kasir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_member: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'transaksi',
    timestamps: false,
  });

  // Definisi hubungan
  Transaksi.associate = (models) => {
    // One-to-Many dengan DetailTransaksi
    Transaksi.hasMany(models.DetailTransaksi, {
      foreignKey: 'id_transaksi',
      as: 'detailTransaksi',
    });

    // Many-to-One dengan User
    Transaksi.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });

    // Many-to-One dengan Member
    Transaksi.belongsTo(models.Member, {
      foreignKey: 'id_member',
      as: 'member',
    });
  };

  return Transaksi;
};
