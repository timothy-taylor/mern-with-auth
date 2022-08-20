const bcrypt = require("bcryptjs");

module.exports.userServices = {
  register: async (db, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await db
        .collection("authentication")
        .insertOne({ username, password: hashedPassword });
  }
}