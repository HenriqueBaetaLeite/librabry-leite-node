const express = require('express');
const booksController = require('./controllers/booksController');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views/books');

app.use('/books', booksController);

// app.get('/books', booksController.index);
// app.get('/books/new', booksController.add);
// app.post('/books', booksController.create);
// app.get('/books/:id', booksController.show);

app.use('*', (req, res) => res.status(404).json({ message: 'notFound' }));

app.listen(3000, () => console.log('Running on port 3000'));
