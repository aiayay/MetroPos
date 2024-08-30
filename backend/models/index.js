const { Sequelize, DataTypes } = require('sequelize');
const dbconfig = require('../config/dbconfig.js');

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
    console.log('Connected to the database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Inisialisasi objek db
const db = {};

db.Sequelize = sequelize;
db.sequelize = sequelize;

// Memuat model
db.DetailTransaksi = require('./detailtransaksi.js')(sequelize, DataTypes);
// db.kategori = require('./kategori.js')(sequelize, DataTypes);
// db.supplier = require('./supplier.js')(sequelize, DataTypes);
// db.transaksi = require('./transaksi.js')(sequelize, DataTypes);
// db.user = require('./user.js')(sequelize, DataTypes);
// db.member = require('./member.js')(sequelize, DataTypes);
// db.pembelian = require('./pembelian.js')(sequelize, DataTypes);
// db.produk = require('./produk.js')(sequelize, DataTypes);
// db.keranjang = require('./keranjang.js')(sequelize, DataTypes);

// memanggil fungsu associate ke semua db.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// Sync database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
  });

module.exports = db;
 