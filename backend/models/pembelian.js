module.exports = (sequelize, DataTypes) => {
  const Pembelian = sequelize.define('Pembelian', {
    id_pembelian: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW, // Tanggal otomatis terisi dengan tanggal saat ini
    },
    harga_beli: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'pembelian',
    timestamps: false,
  });

  Pembelian.associate = (models) => {
    // Relasi many-to-one dengan Supplier
    Pembelian.belongsTo(models.Supplier, {
      foreignKey: 'id_supplier',
      as: 'supplier',
    });
  };

  return Pembelian;
};
