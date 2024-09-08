const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Transaksi = sequelize.define('Transaksi', {
    id_transaksi: {
      type: DataTypes.UUID, 
      defaultValue: uuidv4, 
      primaryKey: true,
    },
    id_member: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'member',
        key: 'id_member',
      },
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
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

  Transaksi.associate = (models) => {
    Transaksi.hasMany(models.DetailTransaksi, {
      foreignKey: 'id_transaksi',
      as: 'detailTransaksi',
    });
    Transaksi.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
    Transaksi.belongsTo(models.Member, {
      foreignKey: 'id_member',
      as: 'member',
    });
  };

  return Transaksi;
};
