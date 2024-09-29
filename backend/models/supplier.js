const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    id_supplier: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    nmsupplier: DataTypes.STRING,
    alamat: DataTypes.STRING,
    notlp: DataTypes.STRING,
  }, {
    tableName: 'supplier',
    timestamps: true,
    createdAt: 'createdAt',  // Sesuai dengan nama kolom di database
    updatedAt: 'updatedAt',  // Jika Anda juga memiliki kolom updatedAt
  });

  Supplier.associate = (models) => {
    Supplier.hasMany(models.Pembelian, {
      foreignKey: 'id_supplier',
      as: 'pembelian',
    });
  };

  return Supplier;
};
