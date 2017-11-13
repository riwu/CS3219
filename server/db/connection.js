const { connect } = require('mongodb').MongoClient;

// Exports a promise of a Mongo Connector
// await this connection to use it in depenedent modules.
module.exports.connection = connect('mongodb://localhost:27017/cs3219');

module.exports.papersCollection = 'a5papers';
