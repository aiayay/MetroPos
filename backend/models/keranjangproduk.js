module.exports = (sequelize, DataTypes) => {
    const KeranjangProduk = sequelize.define('KeranjangProduk', {
      id_keranjangproduk: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      id_keranjang: {
        type: DataTypes.UUID,
        allowNull: false
      },
      id_produk: {
        type: DataTypes.UUID,
        allowNull: false
      },
      kuantitas: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'keranjangproduk',
      timestamps: false
    });
  
    return KeranjangProduk;
  };
  