const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../../db");
const { config } = require("../../config");

//
// passport's strategy 'done' callback takes an error as its first argument
// user object: second argument
// message: third
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const dbConnection = db.getDb();
    try {
      const user = await dbConnection.collection("authentication").findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username"});

      const result = await bcrypt.compare(password, user.password);
      if (!result) return done(null, false, { message: "Incorrect password" });

      return done(null, user, { message: "Logged in successfully" });
    } catch (err) {
      return done(err);
    }
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
