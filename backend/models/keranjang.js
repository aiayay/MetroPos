module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define(
    "Keranjang",
    {
      id_keranjang: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generate UUID otomatis
        primaryKey: true,
        allowNull: false,
      },
      id_member: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_produk: {
        type: DataTypes.STRING, // Mengacu langsung ke produk
        allowNull: false,
      },
      kuantitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },

    {
      tableName: "keranjang",
      timestamps: true,
    }
  );


  // Relasi keranjang dengan member dan produk (jika diperlukan)
  Keranjang.associate = (models) => {
    Keranjang.belongsTo(models.Member, {
      foreignKey: "id_member",
      as: "member",
    });

    Keranjang.belongsTo(models.Produk, {
      foreignKey: "id_produk",
      as: "produk",
    });
  };

  return Keranjang;
};
