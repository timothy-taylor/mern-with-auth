const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { config } = require("./config");
const { db } = require("./db");

db.connectToServer();
const app = express();

app.use(cors());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.listen(config.server.port, () =>
  console.log(`Server listening on ${config.server.port}`)
);
