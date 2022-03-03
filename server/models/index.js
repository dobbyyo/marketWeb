const Sequelize = require("sequelize");
const user = require("./user");
const post = require("./post");
const image = require("./image");
const comment = require("./comment");

const env = process.env.NODE_ENV || "development";
// 배포할떄만 프로덕션으로 변경 지금은 기본값.
const config = require("../config/config")[env];
const db = {};

//개발 중이니깐 디벨로먼트로 설정한거
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Node랑 mysql을 연결하주는것 위 설정
db.Post = post;
db.User = user;
db.Image = image;
db.Comment = comment;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
