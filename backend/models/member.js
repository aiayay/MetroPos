const { v4: uuidv4 } = require('uuid'); 

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id_member: {
      type: DataTypes.STRING,  
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),  // Menghasilkan UUID otomatis ya ges yak
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
    
  }, {
    tableName: 'member',
    timestamps: false
  });

  Member.associate = (models) => {
    Member.hasMany(models.Keranjang, {
      foreignKey: 'id_member',
      as: 'keranjang'  // alias untuk asosiasi
    });
  };

  return Member;
};
