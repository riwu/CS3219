// const mysql = require('promise-mysql');
//
// const connection = mysql.createConnection({
//   host: 'somehost',
//   user: 'user',
//   database: 'db',
//   port: 1150,
//   password: process.env.STUFF_PASSWORD,
// });
//
// export default connection;
//
const { connect } = require('mongodb').MongoClient;

module.exports = connect('mongodb://localhost:27017/cs3219');
