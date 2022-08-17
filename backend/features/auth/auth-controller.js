const passport = require("passport");
const jwt = require("jsonwebtoken");
const { config } = require("../../config");

module.exports.authController = {
  new: (req, res) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);

        const token = jwt.sign(user, config.jwt.secret, { expiresIn: "24h" });
        return res.json({ user: user.username, token });
      });
    })(req, res);
  },
};
