const { v4: uuidv4 } = require('uuid'); 

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id_member: {
      type: DataTypes.STRING,  
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    nama_member: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no_telepon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jk: {  
      type: DataTypes.ENUM('L', 'P'),  
      allowNull: false
    },
  }, {
    tableName: 'member',
    timestamps: true,
    createdAt: 'created_at', // Gunakan 'created_at' sebagai nama kolom
    updatedAt: false
  });

  Member.associate = (models) => {
    Member.hasMany(models.Keranjang, {
      foreignKey: 'id_member',
      as: 'keranjang'  
    });
  };

  return Member;
};
