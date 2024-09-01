// models/kategori.js
module.exports = (sequelize, DataTypes) => {
  const Kategori = sequelize.define('Kategori', {
    id_kategori: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_kategori: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'kategori',
    timestamps: false
  });

  Kategori.associate = (models) => {
    Kategori.hasMany(models.Produk, {
      foreignKey: 'id_kategori',
      as: 'produk'
    });
  };

  return Kategori;
};
