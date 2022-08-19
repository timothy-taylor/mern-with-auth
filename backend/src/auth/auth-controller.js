const { httpStatus } = require("../constants/httpStatus");
const { authServices } = require("./auth-services");

module.exports.authController = {
  //
  // new is authenticated at the router using username and password
  new: (req, res) => {
    const user = req.user;
    const token = authServices.signJWT(user);
    res.status(httpStatus.CREATED).json({ user: user.username, id: user._id, token });
  },
};
