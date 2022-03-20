const express = require("express");
const { Op, where } = require("sequelize");

const { isLoggedIn } = require("./middlewares");
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
      // where,
      limit: 8,
      // offset: 100 // 101 ~ 110 즉 시작위치 뜻
      // offset은 치명적인 단점이 있다. 중간에 삭제하면 어떤 게시글을 안불러올수가 있으므로 사용x
      // 그래서 lastId를 이용한다.
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
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

// 특정 카테고리 포스터들 GET
router.get("/:category/all", async (req, res, next) => {
  try {
    const categoryId = await Post.findAll({
      attributes: ["id", "people"],
      where: { people: req.params.category },
    });
    const where = {
      id: {
        [Op.in]: categoryId.map((v) => v.id),
      },
    };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      where.people = req.params.category;
    }
    console.log(where);
    const posts = await Post.findAll({
      where,
      limit: 9,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "email"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
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

// 특정 카테고리 포스터 개수 GET
router.get("/:category/length", async (req, res, next) => {
  try {
    const categoryPosts = await Post.findAll({
      where: { people: req.params.category },
    });
    if (categoryPosts) {
      res.status(200).json(categoryPosts.length);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 찜한 상품
router.get("/saved", async (req, res, next) => {
  try {
    const saveId = await User.findAll({
      attributes: ["id"],
      where: { id: req.user.id },
      include: [
        {
          model: Post,
          as: "Saved",
        },
      ],
    });
    const where = {
      id: { [Op.in]: saveId[0].Saved.map((v) => v.id) },
    };
    // if (parseInt(req.query.lastId, 10)) {
    //   where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    // }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "email"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
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

// 팔로잉 사람들 정보 가져오기
router.get("/:userId/followings", async (req, res, next) => {
  try {
    const followings = await User.findAll({
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "Followers",
          where: { id: req.params.userId },
        },
      ],
    });
    const where = {
      UserId: { [Op.in]: followings.map((v) => v.id) },
    };
    const users = await User.findAll({
      where,
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 팔로워 사람 정보 가져오기
router.get("/:userId/followers", async (req, res, next) => {
  try {
    const followers = await User.findAll({
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "Followings",
          where: { id: req.params.userId },
        },
      ],
    });
    const where = {
      id: { [Op.in]: followers.map((v) => v.id) },
    };
    const users = await User.findAll({
      where,
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
