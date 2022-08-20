require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db");
const { initializePassport } = require("./src/auth/passport");
const { config } = require("./config");

//
// import routes
const userRouter = require("./src/users/user-router");
const authRouter = require("./src/auth/auth-router");

//
// initial setup
(async () => await connectToDb());
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

const server = app.listen(config.server.port, () =>
  console.log(`Server listening on ${config.server.port}`)
);

module.exports = {
  app,
  disconnectServer: async () => {
    await server.close()
  }
};