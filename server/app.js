const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");

const db = require("./models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");

dotenv.config();

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(morgan("dev"));
// morgan은 http request logger middleware로 HTTp
app.use(
  cors({
    origin: true,
    credentials: true,
    // 도메인이 다르면 쿠키가 안보내지니깐 credentials를 true로 바꿔주면 보내진다.
  })
);

app.use("/", express.static(path.join(__dirname, "uploads")));
// "/"는 현재 서버 localhost3100을 의미  __dirname 뜻은 현재 풀더를 뜻함.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);

app.listen(3100, () => {
  console.log("서버 실행 중!");
});
