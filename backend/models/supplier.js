const { v4: uuidv4 } = require('uuid'); // Mengimpor uuid

module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    id_supplier: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: uuidv4(),  // Menghasilkan UUID otomatis
    },
    nmsupplier: DataTypes.STRING,
    alamat: DataTypes.STRING,
    notlp: DataTypes.STRING,
  }, {
    tableName: 'supplier',
    timestamps: false,
  });

  Supplier.associate = (models) => {
    // Relasi one-to-many dengan Pembelian
    Supplier.hasMany(models.Pembelian, {
      foreignKey: 'id_supplier',
      as: 'pembelian',
    });
  };

  return Supplier;
};
