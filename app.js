const express = require('express');
const bodyParser = require('body-parser');
const booksController = require('./controllers/booksController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extend: true }));

app.get('/books', booksController.index);
app.get('/books/new', booksController.add);
app.post('/books', booksController.create);
app.get('/books/:id', booksController.show);

app.listen(3000, () => console.log('Running on port 3000'));
