module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id_member: {
      type: DataTypes.STRING,  // VARCHAR dari database
      allowNull: false,
      primaryKey: true
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

  return Member;
};
