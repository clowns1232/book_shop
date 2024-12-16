const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  const values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};
const removeLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;";
  const values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

module.exports = {
  addLike,
  removeLike,
};
