const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const join = (req, res) => {
  const { email, password } = req.body;

  const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;

  const values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log("err", err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const loginUser = results[0];
    if (loginUser && loginUser.password === password) {
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "5m", issuer: "taehyeon" }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      return res.status(StatusCodes.CREATED).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};
const requsetPasswordReset = (req, res) => {};
const passwordReset = (req, res) => {};

module.exports = { join, login, requsetPasswordReset, passwordReset };
