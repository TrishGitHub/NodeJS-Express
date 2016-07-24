var mongoose = require('mongoose');
var url = 'mongodb://localhost/chat';
var ChatMessage = mongoose.model('ChatMessage', {username: String, message: String, date: String});

mongoose.connect(url);


var dbModule = (function() {
	function saveMessageToDB(chatMessage) {
		var messageToSave = new ChatMessage(chatMessage);
		
		messageToSave.save(function(err, obj) {
			if(err) {
				throw err;
			}
		});
	}

	function getAllMessages() {
		return ChatMessage.find({}, function(err, msgs) {
			return msgs;
		});
	}

	return {
		saveMessageToDB: saveMessageToDB,
		getAllMessages: getAllMessages
	}
})();


module.exports.dbModule = dbModule;