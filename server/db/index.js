var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'chat'
});

// get from database
connection.connect();
connection.query('SELECT * from messages', function(err, rows, fields) {
  if (err) { throw err; }
  console.log('connected to chat database', rows);
});
connection.end();

// push into database