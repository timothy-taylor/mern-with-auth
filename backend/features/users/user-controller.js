const bcrypt = require("bcryptjs");
const db = require("../../db");
const { authenticateJWT } = require("./user-services");

module.exports.userController = {
  index: (req, res, next) => {
    const { status, message, isLoggedIn, err } = authenticateJWT();
    if (err) return next(err);
    res.status(status).json({ message, isLoggedIn });
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
