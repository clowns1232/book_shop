const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  let { category_id, isNew, currentPage, limit } = req.query;
  if (currentPage && limit) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }

  limit = parseInt(limit);
  category_id = parseInt(category_id);

  const offset = (currentPage - 1) * limit;

  let sql = "SELECT * FROM books LIMIT ? OFFSET ?";
  const values = [limit, offset];

  if (category_id && isNew) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values.push(category_id, isNew);
  } else if (category_id) {
    sql += " WHERE category_id=?";
    values.push(category_id);
  } else if (isNew) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values.push(isNew);
  }

  console.log(sql, values);

  conn.query(sql, values, (err, results) => {
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

  console.log(id);

  const sql = `SELECT books.*, category.id as category_id, category.category_name FROM books LEFT JOIN category
   ON books.category_id = category.id WHERE books.id=?`;

  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results[0]) {
      return res.status(StatusCodes.CREATED).json(results[0]);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
