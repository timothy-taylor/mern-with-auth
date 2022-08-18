const passport = require("passport");
const jwt = require("jsonwebtoken");
const { config } = require("../../config");

module.exports.authController = {
  new: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) return next(err);
      if (user) {
        req.login(user, { session: false }, (err) => {
          if (err) res.send(err);

          const token = jwt.sign(user, config.jwt.secret, {
            expiresIn: config.jwt.expires,
          });
          return res.json({ user: user.username, id: user._id, token });
        });
      }

      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    })(req, res, next);
  },
};
