require('dotenv/config');
const mongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose');

const DB_NAME = 'baetaLeiteLivros';

const URL = process.env.URL;

const urlTest =
  'mongodb+srv://baetaLeite:348900hB@libraryleite.cw0bi.mongodb.net/baetaLeiteLivros?retryWrites=true&w=majority';

const connection = () =>
  mongoClient
    .connect(urlTest, {
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
