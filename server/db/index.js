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
exports.getMessage = function() {
  connection.connect();
  connection.query('SELECT * from messages', function(error, rows, fields) {
    if (error) { throw error; }
    console.log('connected to chat database', rows);
  });
  connection.end();
};

// push into database
exports.createMessage = function(message, callback) {
  connection.connect();

  // add message text
  var tempMessage = {
    userId: 0,
    text: message.text,
    roomId: 0
  };

  // check if username exists in users table
  connection.query('SELECT id FROM users WHERE username=\'' + message.username + '\'', function(error, results, fields) {
    if (error) { throw error; }

    if (results[0] === undefined) {
      connection.query('INSERT INTO users (username) VALUES (\'' + message.username + '\')', function(error, results, fields) {
        if (error) { throw error; }

        tempMessage.userId = results.insertId;
        console.log('created user, set userId:', results.insertId);
      });
    } else {
      console.log(results, 'results');
      tempMessage.userId = results[0].id;
      console.log('set userId:', results[0].id);
    }
    callback(tempMessage);
  });

  // check if room id exists in users table
  connection.query('SELECT id FROM rooms WHERE roomname=\'' + message.roomname + '\'', function(error, results, fields) {
    if (error) { throw error; }

    if (results[0] === undefined) {
      connection.query('INSERT INTO rooms (roomname) VALUES (\'' + message.roomname + '\')', function(error, results, fields) {
        if (error) { throw error; }
        
        tempMessage.roomId = results.insertId;
      });
    } else {
      tempMessage.roomId = results[0].id;
    }
  });

  
};

exports.putMessageInDatabase = function(tempMessage) {
  console.log(tempMessage, 'tempMessage');
  // connection.query('INSERT INTO messages (user_id, text, room_id) VALUES (\'' 
  //   + tempMessage.userId + '\', \''
  //   + tempMessage.text + '\', \''
  //   + tempMessage.roomId
  //   + '\')', function(error, results, fields) {
  //   if (error) { throw error; }
  // });
};





