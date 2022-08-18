const bcrypt = require("bcryptjs");
const db = require("../../db");

module.exports.userController = {
  index: (req, res) => {
    const user = req.user;
    res.json({ message: "in that secret stuff!", user: user.username });
  },

  new: async (req, res) => {
    const dbConnection = db.getDb();
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return res.status(404).json(err);

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
