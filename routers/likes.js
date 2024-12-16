const express = require("express");
const { addLike, removeLike } = require("../controller/LikeController");

const router = express.Router();

router.use(express.Router());

// 좋아요 추가
router.post("/:id", addLike);
// 좋아요 삭제
router.delete("/:id", removeLike);

module.exports = router;
