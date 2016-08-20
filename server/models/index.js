var db = require('../db');
var utils = require('../utils');

module.exports = {
  messages: {
    get: function (request, response) { // a function which produces all the messages
      utils.sendResponse(response, exports.getRequest);
    }, 
    post: function (message) {
      db.createMessage(message, function(completedMessage) {
        db.putMessageInDatabase(completedMessage);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

