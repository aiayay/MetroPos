const { v4: uuidv4 } = require('uuid'); // Mengimpor uuidv4

module.exports = (sequelize, DataTypes) => {
  const Keranjang = sequelize.define(
    "Keranjang",
    {
      id_keranjang: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Menggunakan uuidv4 untuk ID unik
        primaryKey: true,
        allowNull: false,
      },
      id_member: {
        type: DataTypes.STRING,
        allowNull: true,
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
      total_harga: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0, // Nilai default 0
      },
      catatan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "keranjang",
      timestamps: true,
    }
  );

  // Relasi keranjang dengan member dan produk
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
