const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'baetaLeiteBooks';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      // process.exit(1);
      throw err;
    });

module.exports = connection;
