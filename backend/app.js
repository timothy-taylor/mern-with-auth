require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcryptjs");
const { config } = require("./config");
const db = require("./db");

//
// import routes
const userRouter = require("./features/users/user-router");
const authRouter = require("./features/auth/auth-router");

//
// initial setup
db.connectToServer();
const app = express();

//
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
// passport setup
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

app.use(passport.initialize());

//
// routes
app.use("/v1/auth/", authRouter);
app.use("/v1/user/", userRouter);

app.listen(config.server.port, () =>
  console.log(`Server listening on ${config.server.port}`)
);
