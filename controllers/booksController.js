const router = require('express').Router();

const BookModel = require('../models/bookModel');

router.get('/', async (_req, res) => {
  try {
    const books = await BookModel.getAllBooks();

    if (!books) return res.status(400).json({ message: 'Deu ruim no bookModel...' });

    return res.status(200).json({ books });
  } catch (err) {
    console.error(err);
    res.status(422).json({ error: 'Something gone wrong...' });
  }
});

router.get('/new', async (_req, res) => {
  res.status(200).render('add', { message: null });
});

router.get('/:id', async (req, res) => {
  try {
    const book = await BookModel.getBookById(req.params.id);

    if (!book) return res.status(400).json({ message: 'Livro não encontrado...' });

    res.status(200).json({ book });
  } catch (err) {
    console.error(err);

    res.status(422).json({ message: 'Error, something gone wrong... /:id' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await BookModel.removeBook(req.params.id);
    res.status(200).json({ msg: 'Book deleted...' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong on delete...' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await BookModel.updateBook(req.params.id, req.body);
    res.status(200).json({ msg: 'book updated' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Something wrong on update...' });
  }
});

router.post('/new', async (req, res) => {
  const { title, authorName, category, img } = req.body;
  console.log(req.body);
  try {
    const insertBook = await BookModel.addBook(title, authorName, category, img);
    const books = await BookModel.getAllBooks();
    res.status(201).json({ newBook: insertBook, Books: books });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Something gone wrong on insert new book' });
  }
});

module.exports = router;
