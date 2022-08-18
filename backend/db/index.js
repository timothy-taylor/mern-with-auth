const { MongoClient } = require("mongodb");
const { config } = require("../config");

let dbConnection;
const client = new MongoClient(config.db.url);

module.exports = {
  connectToServer: async () => {
    try {
      const connection = await client.connect();
      dbConnection = connection.db(config.db.name);

      if (dbConnection !== undefined) {
        console.log("Successfully connected to MongoDB");
      }
    } catch (err) {
      console.error(err);
    }
  },
  getDb: () => dbConnection,
};
