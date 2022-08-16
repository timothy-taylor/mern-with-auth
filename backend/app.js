require('dotenv').config()
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { config } = require("./config");
const db = require("./db");
const userRouter = require("./features/users/user-router");

db.connectToServer();
const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/users/", userRouter);

app.listen(config.server.port, () =>
  console.log(`Server listening on ${config.server.port}`)
);
