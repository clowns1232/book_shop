const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  const sql = "SELECT * FROM books";
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};
const bookDetail = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const sql = "SELECT * FROM books WHERE id=?";
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};
const booksByCategory = (req, res, next) => {
  let { category_id } = req.query;
  if (category_id === undefined) next();
  category_id = parseInt(category_id);

  const sql = "SELECT * FROM books WHERE category_id=?";
  conn.query(sql, category_id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

module.exports = {
  allBooks,
  bookDetail,
  booksByCategory,
};
