var db = require('./db').dbModule;
var express = require('express');
var app = express();
var port = 5555;

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
	db.getAllMessages()
			.then(function(messages) {
				messages.forEach(function(m) {
					socket.emit('message', m);
				});
			});
	
	socket.on('send', function(data) {
		io.sockets.emit('message', data);
		db.saveMessageToDB(data);
	});
});

console.log('Listening on port ' + port);