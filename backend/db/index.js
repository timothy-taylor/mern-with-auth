const { MongoClient } = require("mongodb");
const { config } = require("../config");

const client = new MongoClient(config.db.url);
let dbConnection;

module.exports = {
  connectToServer: () => {
    client.connect((err, db) => {
      if (err && !db) console.error(err);

      dbConnection = db.db("the_odin_project");

      if (dbConnection !== undefined) 
        console.log("Successfully connected to MongoDB");
    });
  },
  getDb: () => dbConnection,
};

