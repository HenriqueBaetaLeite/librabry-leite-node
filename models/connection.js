const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv/config');

const password = process.env.PASSWORD;
const dbname = 'baetaLeiteLivros';
const DB_NAME = 'baetaLeiteLivros';

const URI = `mongodb+srv://baetaLeite:${password}@libraryleite.cw0bi.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const connection = () =>
  mongoClient
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      return conn.db(DB_NAME);
    })
    .catch((err) => {
      console.error(err);
      // process.exit(1);
      throw err;
    });

// const connectionParams = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// };

// mongoose
//   .connect(URI, connectionParams)
//   .then((res) => {
//     // console.log(res);
//     console.log('Connected to database');
//   })
//   .catch((err) => {
//     console.error(`Error connecting to the database. \n${err}`);
//   });

module.exports = connection;
