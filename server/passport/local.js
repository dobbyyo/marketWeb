const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        // 프론트 폼에서 입력 받은거 가져온거.
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않은 유저입니다." });
            // 첫번째 서버에러 , 두번째 성공, 세번쨰 클라이언트 에러
          }
          const result = await bcrypt.compare(password, user.password);
          // 첫번째 우리가 입력한 비밀번호 두번쨰 디비에 저장되어있는 패스워드 비교
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
