const { userServices } = require("./user-services");
const { httpStatus } = require("../constants/httpStatus");
const { userValidations } = require("./user-validations");

module.exports.userController = {
  //
  // index is authenticated at the router level using JSON Web Tokens
  index: (req, res) => {
    const user = req.user;
    res.json({ message: "in that secret stuff!", user: user.username });
  },

  new: async (req, res) => {
    try {
      const { username, password } = await userValidations.newSchema.validateAsync(req.body);
      const user = await userServices.register(username, password);
      res.status(httpStatus.CREATED).json(user);
    } catch (err) {
      res.status(httpStatus.BAD_REQUEST).json(err);
    }
  },
};
