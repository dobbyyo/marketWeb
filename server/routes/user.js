const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { User, Post, Image, Comment } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploadUser");
} catch (error) {
  console.log("make a uploadUser");
  fs.mkdirSync("uploadUser");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploadUser");
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

//  회원가입
router.post("/signup", upload.none(), async (req, res, next) => {
  try {
    const existUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existUser) {
      return res.status(403).send("이미 사용 중인 이메일입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      nickname: req.body.nickname,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // 서버, 성공, 클라이언트
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      // user에 user 정보가 들어있다.
      // passport에 있느 로그인 방법
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id", "nickname"],
          },
          {
            model: Image,
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// 로그인 유저 정보 가져오기
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id", "nickname"],
          },
          {
            model: Image,
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 유저 정보 가져오기
router.get("/:userId", async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followings",
          attributes: ["id", "nickname"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      // 시퀄라이즈에서 보내준 데이터는 제이슨이 아니므로 json으로 변경해줘야 사용가능.
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 유저 게시글 가져오기
router.get("/:userId/posts", async (req, res, next) => {
  try {
    const where = { userId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
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
          model: Image,
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("SUCCESS");
});

// get 팔로워
router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("존재 하지 않은 유저입니다.");
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// get 팔로잉
router.get("/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(403).send("존재 하지 않은 유저입니다.");
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 팔로워
router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("유저가 존재하지 않습니다.");
    }
    await user.addFollowers(req.user.id); //패스포트에 저장된 유저 정보
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 언팔로워
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      res.status(403).send("유저가 존재하지 않습니다.");
    }
    await user.removeFollowers(req.user.id); //패스포트에 저장된 로그인한 유저 정보
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 닉네임 변경
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 비밀번호 변경
router.patch("/password", isLoggedIn, async (req, res, next) => {
  try {
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      req.user.password
    );
    const hashedPassword = await bcrypt.hash(req.body.changePassword, 10);
    if (comparePassword) {
      await User.update(
        {
          password: hashedPassword,
        },
        {
          where: { id: req.user.id },
        }
      );
    } else {
      console.log(comparePassword);
      return res.status(403).send("비밀번호가 일치하지 않습니다.");
    }
    console.log(comparePassword);
    res.status(200).json("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 회원탈퇴
router.delete("/:userId", isLoggedIn, async (req, res, next) => {
  try {
    await Comment.destroy({
      where: { UserId: req.params.userId },
    });
    await Post.destroy({
      where: { UserId: req.params.userId },
    });
    await User.destroy({
      where: { id: req.user.id },
    });
    res.status(200).json("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저 이미지 업로드
router.post(
  "/image",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.file);
    res.json(req.file.filename);
  }
);

// 유저 이미지 업로드 확인
router.post(
  "/:userId/image",
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      console.log(req.body.image);
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      if (!user) {
        return res.status(403).send("존재하지 않는 유저입니다.");
      }
      Image.destroy({
        where: { UserId: req.user.id },
      });

      if (req.body.image) {
        await Image.create({
          src: req.body.image,
          UserId: req.user.id,
        });
        // await user.addImages(image);
      }
      const Img = await Image.findOne({
        where: { UserId: req.user.id },
        attributes: ["src"],
      });
      res.status(200).send(Img);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
