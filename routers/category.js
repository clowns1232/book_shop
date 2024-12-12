const express = require("express");
const router = express.Router();
const { allCategory } = require("../controller/CategoryContorller");

router.use(express.Router());

// 카테고리 전체 조회
router.get("/", allCategory);

module.exports = router;
