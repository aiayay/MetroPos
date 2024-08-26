const dbconfig = require('../config/dbconfig.js');
const { Sequelize, DataTypes } = require('sequelize');

// Buat instance sequelize
const sequelize = new Sequelize(
  dbconfig.DB,
  dbconfig.USER,
  dbconfig.PASSWORD,
  {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    

    pool: {
      max: dbconfig.pool.max,
      min: dbconfig.pool.min,
      acquire: dbconfig.pool.acquire,
      idle: dbconfig.pool.idle
    }
  }
);

// Autentikasi koneksi
sequelize.authenticate()
  .then(() => {
    console.log('connected..');
  })
  .catch(err => {
    console.log('error:' + err);
  });

// Inisialisasi objek db
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Memuat model
db.products = require('./productmodel.js')(sequelize, DataTypes);


// Sync database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!');
  });

module.exports = db;
