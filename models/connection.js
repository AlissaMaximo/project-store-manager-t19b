require('dotenv').config();

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  database: process.env.MYSQL_DATABASE || 'StorageManager',
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
});

module.exports = connection;
