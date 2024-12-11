const mariadb = require("mysql2");

const conn = mariadb.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "Bookshop",
  dateStrings: true,
  port: "3306",
});

module.exports = conn;
