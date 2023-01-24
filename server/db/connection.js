const { MongoClient } = require("mongodb");

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;

const client = new MongoClient(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`);
const db = client.db("cs3219");

module.exports.connection = db;
module.exports.papersCollection = "a5papers";
