require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { initializePassport } = require("./passport");
const { config } = require("./config");

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
app.use(initializePassport());

//
// routes
app.use("/v1/auth/", authRouter);
app.use("/v1/user/", userRouter);

app.listen(config.server.port, () =>
  console.log(`Server listening on ${config.server.port}`)
);
