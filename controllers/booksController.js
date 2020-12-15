const express = require('express');

const router = express.Router();

const BookModel = require('../models/bookModel');

router.get('/', async (_req, res) => {
  try {
    const books = await BookModel.getAllBooks();

    return res.status(200).render('index', { books });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: 'Something gone wrong...' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await BookModel.getBookById(req.params.id);
    console.log(req.params);

    res.status(200).json({ book });
  } catch (err) {
    console.log(err);

    res.status(422).json({ message: 'Error, something gone wrong...' });
  }
});

router.post('/', async (req, res) => {
  const { title, author, category } = req.body;
  try {
    const book = { title, author, category };
    const insertBook = BookModel.addBook(book);
    const books = BookModel.getAllBooks();
    res.status(201).render('index', { books });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Something gone wrong' });
  }
});

const index = async (req, res) => {
  const { insertedBook } = req.query;
  const message = insertedBook ? 'Cadastrado com sucesso!' : null;
  const books = await BookModel.findAll();
  res.render('books/index', { books, message });
};

const add = (_req, res) => {
  res.render('books/add', { message: null });
};

const create = async (req, res) => {
  const { nome } = await req.body;
  if (!BookModel.isValid(nome))
    return res.status(400).render('/books', { message: 'Dados inválidos' });
  await BookModel.create(nome);
  res.redirect('/books?insertedBook=true');
};

const show = async (req, res) => {
  const { id } = req.params;

  const book = await BookModel.find(id);

  res.json(book);
};

const destroy = (_req, res) => {
  res.send('Livro deletado com sucesso');
};

module.exports = router;
{
  index, add, create, show;
}
