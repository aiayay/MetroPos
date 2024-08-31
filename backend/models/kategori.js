const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbconfig.js');

const Kategori = sequelize.define('kategori', {
    id_kategori: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nmkategori: DataTypes.STRING,
}, {
    tableName: 'kategori',
    timestamps: false,
});

Kategori.associate = (models) => {
    // Relasi one-to-many dengan Produk
    Kategori.hasMany(models.Produk, {
        foreignKey: 'id_kategori',
        as: 'produk',
    });
};

module.exports = Kategori;