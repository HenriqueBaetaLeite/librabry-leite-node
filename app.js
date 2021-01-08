const express = require('express');
const booksController = require('./controllers/booksController');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views/books');

app.use('/books', booksController);

app.use('*', (_req, res) => res.status(404).json({ message: 'notFound' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
