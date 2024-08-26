const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('metropos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // matikan logging SQL jika tidak diperlukan
});

module.exports = sequelize;
