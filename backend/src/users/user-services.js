const db = require("../../db");
const bcrypt = require("bcryptjs");

module.exports.userServices = {
  register: async (username, password) => {
    const dbConnection = db.getDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    return await dbConnection
        .collection("authentication")
        .insertOne({ username, password: hashedPassword });
  }
}