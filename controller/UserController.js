const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const join = (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(64).toString("base64");
  const hashPasswrd = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("base64");

  const sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;

  const values = [email, hashPasswrd, salt];

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
    const rawPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 64, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password === rawPassword) {
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

const requsetPasswordReset = (req, res) => {
  const { email } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const user = results[0];

    if (user) {
      return res.status(StatusCodes.OK).json({
        email: email,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};
const passwordReset = (req, res) => {
  const { email, password } = req.body;

  const sql = `UPDATE users SET password=?, salt=? WHERE email=?`;
  const salt = crypto.randomBytes(64).toString("base64");

  const hashPasswrd = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
  const values = [hashPasswrd, salt, email];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  });
};

module.exports = { join, login, requsetPasswordReset, passwordReset };
