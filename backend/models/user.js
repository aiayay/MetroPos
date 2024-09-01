

module.exports = (sequelize,DataTypes) => {
const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Perbaiki dari autoincrement menjadi autoIncrement
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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
  timestamps: false,
});

// Definisi hubungan
User.associate = (models) => {
  User.hasMany(models.Transaksi, {
    foreignKey: 'id_user', // Perbaiki FOREIGNKEYS menjadi foreignKey
    as: 'transaksi',
  });
};

return  User;

};
