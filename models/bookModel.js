const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllBooks = async () =>
  connection()
    .then((db) => db.collection('livros').find().toArray())
    .catch((err) => {
      throw err;
    });

const getBookById = async (id) => {
  const idIsValid = ObjectId(id);
  if (!idIsValid) return false;
  const db = await connection();
  return db
    .collection('livros')
    .findOne(ObjectId(id))
    .catch((err) => {
      throw err;
    });
};

const getBookByName = async (name) =>
  connection()
    .then((db) => db.collection('livros').findOne({ name }))
    .catch((err) => {
      throw err;
    });

const getBookByAuthorName = async (author) =>
  connection()
    .then((db) => db.findOne({ author }))
    .catch((err) => {
      throw err;
    });

const addBook = async (title, authorName, category, img) => {
  const db = await connection();
  const result = await db
    .collection('livros')
    .insertOne({ title, authorName, category, img })
    .catch((err) => {
      throw err;
    });

  return result.ops[0];
};

const updateBook = async (id, { title, authorName, category, img }) =>
  connection()
    .then((db) =>
      db
        .collection('livros')
        .updateOne({ _id: ObjectId(id) }, { $set: { title, authorName, category, img } }),
    )
    .catch((err) => {
      throw err;
    });

const removeBook = async (id) => {
  const book = await getBookById(id);
  if (!book) return false;
  await connection()
    .then((db) => db.collection('livros').deleteOne({ _id: ObjectId(id) }))
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
