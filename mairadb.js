const mariadb = require("mysql2");

// const connection = mariadb.createPool({
//   host: "localhost",
//   user: "root",
//   password: process.env.PASSWORD,
//   database: "Bookshop",
//   dateStrings: true,
//   port: "3306",
// });

const connection = mariadb.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "Bookshop",
  dateStrings: true,
  port: "3306",
});

module.exports = connection;
