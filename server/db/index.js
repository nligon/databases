var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'chat'
});
connection.connect();

exports.checkIfUsernameExists = function(message, tempMessage, callback) {
  
  connection.query('SELECT id FROM users WHERE username=\'' + message.username + '\'', function(error, results, fields) {
    if (error) { throw error; }

    if (results[0] === undefined) {
      connection.query('INSERT INTO users (username) VALUES (\'' + message.username + '\')', function(error, results, fields) {
        if (error) { throw error; }
        tempMessage.userId = results.insertId;
        callback(message, tempMessage);
      });
    } else {
      tempMessage.userId = results[0].id;
      callback(message, tempMessage);
    }
  });
};

exports.checkIfRoomExists = function(message, tempMessage, callback) {
  connection.query('SELECT id FROM rooms WHERE roomname=\'' + message.roomname + '\'', function(error, results, fields) {
    if (error) { throw error; }
    if (results[0] === undefined) {
      connection.query('INSERT INTO rooms (roomname) VALUES (\'' + message.roomname + '\')', function(error, results, fields) {
        if (error) { throw error; }
        tempMessage.roomId = results.insertId;
        callback(tempMessage);
      });
    } else {
      tempMessage.roomId = results[0].id;
      callback(tempMessage);
    }
  });
};

// push into database
exports.createMessage = function(tempMessage) {
  console.log(tempMessage, 'tempMessage');
  connection.query('INSERT INTO messages (user_id, text, room_id) VALUES (\'' 
    + tempMessage.userId + '\', \''
    + tempMessage.text + '\', \''
    + tempMessage.roomId
    + '\')', function(error, results, fields) {
    if (error) { throw error; }
  });
};





