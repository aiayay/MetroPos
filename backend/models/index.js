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
db.detail_transaksi = require('./detail_transaksi.js')(sequelize, DataTypes);
db.kategori = require('./kategori.js')(sequelize, DataTypes);
db.supplier = require('./supplier.js')(sequelize, DataTypes);
db.transaksi = require('./transaksi.js')(sequelize, DataTypes);
db.user = require('./user.js')(sequelize, DataTypes);
db.member = require('./member.js')(sequelize, DataTypes);
db.pembelian = require('./pembelian.js') (sequelize, DaTaTypes);
db.produk = require ('./produk.js') (sequelize,DaTaTypes);
db.keranjang = require ('./keranjang.js') (sequelize,DaTaTypes)


// Sync database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!');
  });

module.exports = db;
