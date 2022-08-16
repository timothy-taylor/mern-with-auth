const db = require("../../db");

module.exports.userController = {
  new: async (req, res) => {
    const dbConnection = db.getDb();
    const data = req.body;
    const result = await dbConnection.collection("authentication").insertOne(data);
    res.json(`A document was inserted with the _id: ${result.insertedId}`);
  }
}
