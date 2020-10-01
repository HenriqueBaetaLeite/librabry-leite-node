const mysqlx = require('@mysql/xdevapi');

// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost:33060',
//   user: 'root',
//   password: '348900hb',
//   database: 'nossos_livros',
// });

// connection.connect((err) => {
//   if (err) throw err;
//   const sql =
//     'select l.nome as livro, a.nome as autor from livros as l inner join autor as a on l.autor_id = a.autor_id order by l.nome';
//   connections.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
//   console.log('Connected');
// });

const connection = () => {
  return mysqlx
    .getSession({
      user: 'root',
      password: '348900hB',
      host: 'localhost',
      port: 33060,
    })
    .then((session) => {
      schema = session.getSchema('nossos_livros');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
