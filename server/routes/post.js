const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      category: req.body.category,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
  }
});
// upload.single => req.file 객체에 한 개의 파일 업로드
// upload.array => req.files 객체에 한 개의 속성, 여러 개의 파일 업로드 배열
// ipload.fields({name: 'profile, maxCount: 1}, {name: 'photo', })

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!psot) {
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

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads");
//     },
//     filename(req, file, done) {
//       // EX) 강아지.png
//       const extend = path.extname(file.originalname); // 확장자 추출 (.Png)
//       const basename = path.basename(file.originalname, extend); // 강아지
//       done(null, basename + "_" + new Date().getTime() + extend); // 강아지(숫자).png ex) 강아지1212.Png
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
// });

// 위 처럼 설정해준 이유는 먼저 업로드한사람이랑 나중에 업로드 한사람이 이름이 같으면 덮어씌우기 때문에 시간까지 더한다.
// 나중에 빅 프로젝트에서는 프론트에서 바로 클라우드로 넘겨주는 것이 좋다.

module.exports = router;
