const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('livros').select(['nome']).execute())
    .then((results) => results.fetchAll())
    .then((books) => books.map(([nome]) => ({ nome })));

const isValid = (title) => {
  return title;
};

const find = async (id) => {
  connection()
    .then((db) => db.getTable('livros').select(['nome']).where('id = :id').bind('id', id).execute())
    .then((results) => results.fetchAll())
    .then((books) => books[0].map((book) => book));
};

const create = async (title) =>
  connection().then((db) => db.getTable('livros').insert(['nome']).values(title).execute());

module.exports = { findAll, create, isValid, find };
