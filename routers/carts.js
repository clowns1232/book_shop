const express = require("express");
const router = express.Router();

router.use(express.Router());

// 장바구니 담기
router.post("/", (req, res) => {
  res.json("장바구니 담기");
});
// 장바구니 조회
router.get("/:id", (req, res) => {
  res.json("장바구니 조회");
});

// 장바구니 도서 삭제
router.delete("/:id", (req, res) => {
  res.json("장바구니 삭제");
});

// 장바구니 선택 주문 예상 상품 조회
// router.post("/", (req, res) => {
//   res.json("장바구니 선택 주문 예상 상품 조회");
// });

module.exports = router;
