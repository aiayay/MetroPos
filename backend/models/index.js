const fs = require('fs');
const path = require('path');
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
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Memuat semua model secara otomatis dari folder ini
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

//Memanggil fungsi associate jika ada

if (db['Keranjang'] && db['Keranjang'].associate) {
  db['Keranjang'].associate(db);
}

if (db['Member'] && db['Member'].associate) {
  db['Member'].associate(db);
}

if (db['Produk'] && db['Produk'].associate) {
  db['Produk'].associate(db);
}

if (db['Transaksi'] && db['Transaksi'].associate) {
  db['Transaksi'].associate(db);
}

if (db['User'] && db['User'].associate) {
  db['User'].associate(db);
}

if (db['Kategori'] && db['Kategori'].associate) {
  db['Kategori'].associate(db);
}
// Sinkronisasi database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

module.exports = db;
