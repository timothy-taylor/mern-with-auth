const { MongoClient } = require("mongodb");
const { config } = require("../config");

const client = new MongoClient(config.db.url);
let dbConnection = null;

module.exports = {
  connectToDb: async () => {
    try {
      const connection = await client.connect();
      dbConnection = connection.db(config.db.name);

      if (dbConnection) {
        console.log("Successfully connected to MongoDB");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  disconnectDb: () => {
    client
      .close()
      .then(() => console.log("Successfully disconnected from MongoDB"));
  },
  getDb: () => dbConnection,
};