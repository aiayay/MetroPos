const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id_user: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(), // Generate UUID for new users
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Menambahkan unique untuk username
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
    },
    notlp: {
      type: DataTypes.STRING,
    },
    jk: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.ENUM('admin', 'kasir'),
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'user',
    timestamps: true,
    createdAt: 'createdAt',  // Sesuai dengan nama kolom di database
    updatedAt: 'updatedAt',
  });

  // Definisi hubungan
  User.associate = (models) => {
    User.hasMany(models.Transaksi, {
      foreignKey: 'id_user',
      as: 'transaksi',
    });
  };

  return User;
};
