module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_member: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user',
      },
    },
    nama_kasir: {
      type: DataTypes.STRING,
      allowNull: false, // Kolom wajib karena setiap transaksi memiliki kasir
    },
    nama_member: {
      type: DataTypes.STRING,
      allowNull: true, // Bisa null karena tidak semua transaksi memiliki member
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

    // Menambahkan relasi dengan User
    Transaksi.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user', // Alias untuk mengakses data user dari transaksi
    });
  };
  Transaksi.belongsTo(models.Member, {
    foreignKey: 'id_member',
    as: 'member',
  });


  return Transaksi;
};
