const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 풀더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // EX) 강아지.png
      const extend = path.extname(file.originalname);
      // 확장자 추출 (.Png)
      const basename = path.basename(file.originalname, extend);
      // 강아지
      done(null, basename + "_" + new Date().getTime() + extend);
      // 강아지(숫자).png ex) 강아지1212.Png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 위 처럼 설정해준 이유는 먼저 업로드한사람이랑 나중에 업로드 한사람이 이름이 같으면 덮어씌우기 때문에 시간까지 더한다.
// 나중에 빅 프로젝트에서는 프론트에서 바로 클라우드로 넘겨주는 것이 좋다.

// 게시글 업로드
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      clothes: req.body.clothes,
      people: req.body.people,
      UserId: req.user.id,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        // Promise.all을 하면 한번에 디비에 저장이 된다.
        // 보통 이미지는 클라우드에 저장하고 주소는 디비에 저장한다.
        await post.addImages(images);
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// upload.single => req.file 객체에 한 개의 파일 업로드
// upload.array => req.files 객체에 한 개의 속성, 여러 개의 파일 업로드 배열
// ipload.fields({name: 'profile, maxCount: 1}, {name: 'photo', })

// 특정 게시글 댓글 업로드
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 상품입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 이미지 업로드
router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  // 프론트 append 키값이랑 같아야함.
  async (req, res, next) => {
    // 여러장일때 array 한개일때 single
    // TEXT같은 것만 있을때는 none
    // 전송 폼이 여러개면 files
    console.log(req.files);
    res.json(req.files.map((img) => img.filename));
  }
);

// 게시글 삭제
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.json({ PostId: req.params.postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 게시글 get
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("존재하지 않은 게시글입니다.");
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
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
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스터 좋아요!
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스터 싫어요ㅠㅠ
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 작성
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스터 검색
router.get("/:search/posts", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { title: decodeURIComponent(req.params.search) },
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
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
              order: [["createdAt", "DESC"]],
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
    // console.log(decodeURIComponent(req.params.search)),
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스터 수정
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        price: req.body.price,
        clothes: req.body.clothes,
        people: req.body.people,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      clothes: req.body.clothes,
      people: req.body.people,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
