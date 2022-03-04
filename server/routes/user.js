const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post, Image, Comment } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// /user 회원가입
router.post("/signup", async (req, res, next) => {
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

// 로그인;
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
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// 유저 정보 가져오기
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
        ],
      });
      console.log(req.headers);
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
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      // 시퀄라이즈에서 보내준 데이터는 제이슨이 아니므로 json으로 변경해줘야 사용가능.

      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
    console.log(req.headers);
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

module.exports = router;
