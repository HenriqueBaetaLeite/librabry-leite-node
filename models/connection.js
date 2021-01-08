const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv/config');

const DB_NAME = 'baetaLeiteLivros';

const URL = process.env.URL;

const connection = () =>
  mongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      return conn.db(DB_NAME);
    })
    .catch((err) => {
      console.error(err);
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
