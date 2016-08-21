var db = require('../db');
var utils = require('../utils');

module.exports = {
  messages: {
    get: function (request, response) { // a function which produces all the messages
      utils.sendResponse(response, exports.getRequest);
    }, 
    post: function (message) {
      var tempMessage = {
        userId: 0,
        text: message.text,
        roomId: 0
      };
      db.checkIfUsernameExists(message, tempMessage, function(message) {
        db.checkIfRoomExists(message, tempMessage, function(message) {
          db.createMessage(tempMessage);
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

