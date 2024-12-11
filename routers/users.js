const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

router.use(express.Router());

// 회원가입
router.post("/join", (req, res) => {
  const { email, password } = req.body;

  const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;

  const values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log("err", err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.CREATED).json(results);
  });
});
// 로그인
router.post("/login", (req, res) => {
  res.json("로그인");
});
// 비밀번호 초기화 요청
router.post("/reset", (req, res) => {
  res.json("비밀번호 초기화 요청");
});
// 비밀번호 초기화
router.put("/reset", (req, res) => {
  res.json("비밀번호 초기화");
});

module.exports = router;
