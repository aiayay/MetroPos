const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Kategori = sequelize.define('Kategori', {
    id_kategori: {
      type: DataTypes.STRING, 
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(), 
    },
    nama_kategori: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'kategori',
    timestamps: true,
    createdAt: 'created_at', // Gunakan 'created_at' sebagai nama kolom
    updatedAt: false
  });

  // Kategori.associate = (models) => {
  //   Kategori.hasMany(models.Produk, {
  //     foreignKey: 'id_kategori',
  //     as: 'produk',
  //   });
  // };

  return Kategori;
};
