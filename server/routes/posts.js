const express = require("express");
const { Op, where } = require("sequelize");

const { Post, Image, User, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 ~~~~ 1
    const posts = await Post.findAll({
      // 모든 게시물 가져오기
      // where: { id: lastId },
      limit: 10,
      // offset: 100 // 101 ~ 110 즉 시작위치 뜻
      // offset은 치명적인 단점이 있다. 중간에 삭제하면 어떤 게시글을 안불러올수가 있으므로 사용x
      // 그래서 lastId를 이용한다.
      order: [[["createdAt", "DESC"]]],
      include: [
        {
          model: User,
        },
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
