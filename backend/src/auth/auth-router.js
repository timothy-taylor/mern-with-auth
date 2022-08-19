const express = require("express");
const passport = require("passport");
const router = express.Router();
const { authController } = require("./auth-controller");

router.post("/", passport.authenticate("local", { session: false }), authController.new);

module.exports = router;
