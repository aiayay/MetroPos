const { v4: uuidv4 } = require('uuid'); // Mengimpor uuid

module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    id_transaksi: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(), // Menggunakan UUID secara otomatis
    },
    id_member: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'member', // Sesuaikan dengan nama model yang tepat
        key: 'id_member',
      },
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user', // Sesuaikan dengan nama model yang tepat
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
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_bayar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bayar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    potongan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    metode_bayar: {
      type: DataTypes.STRING,
      allowNull: false,
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
