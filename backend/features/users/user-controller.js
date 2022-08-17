const db = require("../../db");
const bcrypt = require("bcryptjs");

module.exports.userController = {
  new: async (req, res, next) => {
    const dbConnection = db.getDb();
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      const data = { username, password: hashedPassword };
      const result = await dbConnection
        .collection("authentication")
        .insertOne(data);
      res.json(`A document was inserted with the _id: ${result.insertedId}`);
    });
  },
};
