const jwt = require("jsonwebtoken");
const { config } = require("../../config");

module.exports.authController = {
  new: (req, res) => {
    const user = req.user;
    const jwtOptions = { expiresIn: config.jwt.expires };
    const token = jwt.sign(user, config.jwt.secret, jwtOptions);
    res.json({ user: user.username, id: user._id, token });
  },
};
