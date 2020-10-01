const Book = require('../models/bookModel');

const index = async (req, res) => {
  const { insertedBook } = req.query;
  const message = insertedBook ? 'Cadastrado com sucesso!' : null;
  const books = await Book.findAll();
  res.render('books/index', { books, message });
};

const add = (_req, res) => {
  res.render('books/add', { message: null });
};

const create = async (req, res) => {
  const { nome } = await req.body;
  if (!Book.isValid(nome)) return res.status(400).render('/books', { message: 'Dados inválidos' });
  await Book.create(nome);
  res.redirect('/books?insertedBook=true');
};

const show = async (req, res) => {
  const { id } = req.params;

  const book = await Book.find(id);

  res.json(book);
};

const destroy = (_req, res) => {
  res.send('Livro deleteado com sucesso');
};

module.exports = { index, add, create, show };
