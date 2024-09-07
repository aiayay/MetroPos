module.exports = {
  HOST: 'localhost',
  USER: 'root', // pastikan menggunakan lowercase 'root'
  PASSWORD: '',
  DB: 'metropos1',
  dialect: 'mysql',

  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};


