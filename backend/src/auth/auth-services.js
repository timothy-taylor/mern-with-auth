const jwt = require("jsonwebtoken");
const { config } = require("../../config");

module.exports.authServices = {
  signJWT: (user) => {
    const jwtOptions = { expiresIn: config.jwt.expires };
    return jwt.sign(user, config.jwt.secret, jwtOptions);
  },
}