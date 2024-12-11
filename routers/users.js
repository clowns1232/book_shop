const express = require("express");
const router = express.Router();

const {
  join,
  passwordReset,
  requsetPasswordReset,
  login,
} = require("../controller/UserController");

router.use(express.Router());

// 회원가입
router.post("/join", join);
// 로그인
router.post("/login", login);
// 비밀번호 초기화 요청
router.post("/reset", requsetPasswordReset);
// 비밀번호 초기화
router.put("/reset", passwordReset);

module.exports = router;
