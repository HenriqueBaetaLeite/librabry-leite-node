const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllBooks = async () =>
  connection()
    .then((db) => db.collection('newBooks').find().toArray())
    .catch((err) => {
      throw err;
    });

const getBookById = async (id) => {
  const idIsValid = ObjectId(id);
  if (!idIsValid) return false;
  const db = await connection();
  return db
    .collection('books')
    .findOne(ObjectId(id))
    .catch((err) => {
      throw err;
    });
};

const getBookByName = async (name) =>
  connection()
    .then((db) => db.collection('books').findOne({ name }))
    .catch((err) => {
      throw err;
    });

const getBookByAuthorName = async (author) =>
  connection()
    .then((db) => db.findOne({ author }))
    .catch((err) => {
      throw err;
    });

const addBook = async (book) => {
  const db = await connection();
  const result = await db
    .collection('books')
    .insertOne({ book })
    .catch((err) => {
      throw err;
    });

  return result.ops[0];
};

const updateBook = async (id, book) =>
  connection()
    .then((db) => db.collection('books').updateOne({ id: ObjectId(id) }, { $set: { book } }))
    .catch((err) => {
      throw err;
    });

const removeBook = async (id) => {
  const book = await getBookById(id);
  if (!book) return false;
  await connection()
    .then((db) => db.collection('books').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getAllBooks,
  getBookById,
  getBookByName,
  getBookByAuthorName,
  addBook,
  updateBook,
  removeBook,
};
