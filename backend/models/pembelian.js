module.exports = (sequelize, DataTypes) => {
  const Pembelian = sequelize.define('Pembelian', {
    id_pembelian: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_produk: DataTypes.STRING,
    kuantitas: DataTypes.INTEGER,
    id_supplier: DataTypes.STRING,
    tanggal: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW, // Tanggal otomatis terisi dengan tanggal saat ini
    },})
    harga_beli: DataTypes.INTEGER,
    
    Pembelian.associate = (models) => {
      // Relasi many-to-one dengan Supplier dan Produk
      Pembelian.belongsTo(models.Supplier, {
        foreignKey: 'id_supplier',
        as: 'supplier',
      });
      Pembelian.belongsTo(models.Produk, {
        foreignKey: 'id_produk',
        as: 'produk',
      });
    };

  return Pembelian;
};
