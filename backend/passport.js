const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("./db");
const { config } = require("./config");

//
// passport's strategy 'done' callback takes an error as its first argument
// user object: second argument
// message: third
passport.use(
  new LocalStrategy((username, password, done) => {
    const dbConnection = db.getDb();
    dbConnection
      .collection("authentication")
      .findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username" });
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return done(err);
          if (res) {
            return done(null, user, { message: "Logged in successfully" });
          }

          return done(null, false, { message: "Incorrect password" });
        });
      });
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);

module.exports.initializePassport = () => passport.initialize();
