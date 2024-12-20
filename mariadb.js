const mariadb = require("mysql2/promise");

const connection = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "Bookshop",
  dateStrings: true,
  port: "3306",
});

module.exports = connection;
