const bcrypt = require("bcryptjs");
const passport = require("passport");
const db = require("../../db");

module.exports.userController = {
  index: (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, payload) => {
      if (err) return next(err);
      if (payload) {
        return res.json({
          message: "Successfully authenticated",
          isLoggedIn: true,
        });
      }

      return res
        .status(403)
        .json({ message: "Authentication unsuccessful", isLoggedIn: false });
    })(req, res, next);
  },

  new: async (req, res, next) => {
    const dbConnection = db.getDb();
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      const data = { username, password: hashedPassword };
      const result = await dbConnection
        .collection("authentication")
        .insertOne(data);
      res.json({
        message: `A document was inserted with the _id: ${result.insertedId}`,
      });
    });
  },
};
