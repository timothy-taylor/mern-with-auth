const express = require("express");
const router = express.Router();
const { userController } = require("./user-controller");

router.get("/", userController.index);
router.post("/", userController.new);

module.exports = router;
