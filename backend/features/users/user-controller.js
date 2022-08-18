const bcrypt = require("bcryptjs");
const db = require("../../db");

module.exports.userController = {
  //
  // index is authenticated at the router level using JWT
  index: (req, res) => {
    const user = req.user;
    res.json({ message: "in that secret stuff!", user: user.username });
  },

  new: async (req, res) => {
    const dbConnection = db.getDb();
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = { username, password: hashedPassword };
      const result = await dbConnection
        .collection("authentication")
        .insertOne(data);

      res.json({
        message: `A document was inserted with the _id: ${result.insertedId}`,
      });
    } catch (err) {
      res.status(404).json(err);
    }
  },
};
