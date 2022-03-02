const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post } = require("../models");
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
      // const fullUserWithoutPassword = await User.findOne({
      //   where: { id: user.id },
      //   attributes: {
      //     exclude: ["password"],
      //   },
      //   include: [
      //     {
      //       model: Post,
      //       attributes: ["id"],
      //     },
      //   ],
      // });
      return res.status(200).json(user);
    });
  })(req, res, next);
});

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
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("SUCCESS");
});

module.exports = router;
