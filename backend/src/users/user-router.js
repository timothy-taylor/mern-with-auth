const express = require("express");
const passport = require("passport");
const router = express.Router();
const { userController } = require("./user-controller");

router.get("/", passport.authenticate('jwt', { session: false }), userController.index);
router.post("/", userController.new);

module.exports = router;
