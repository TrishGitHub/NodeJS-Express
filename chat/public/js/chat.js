var chatModule = (function() {
	function _enableChatting(username) {

		var socket = io.connect('http://localhost:5555');
		var messages_box = document.getElementById('messages_box');
		var messageField = document.getElementById('message');
		var sendButton = document.getElementById('send');
		var newMessage;

		socket.on('message', function (data) {
			if(data.message) {
				newMessage = (data.username ? '<b>' + data.username + ': </b> ' : '');
				newMessage += data.message + '<br />';
				messages_box.innerHTML += newMessage;
				messages_box.scrollTop = messages_box.scrollHeight;
			}
		});

		function sendMessage() {
			var date, chatMessage;
			if(messageField.value == '') {
				alert('Your message cannot be blank!');
			}
			else {
				date = new Date();
				chatMessage = {username: username, message: messageField.value, date: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
				socket.emit('send', chatMessage);
				messageField.value = "";
				messageField.focus();
			}
		}

		sendButton.onclick = sendMessage;

		messageField.onkeypress = function(event) {
			if(event.keyCode == 13)
				sendMessage();
		}
	}

	function _hideNamePopUp() {
		document.getElementById('blanket').style.display = 'none';
		document.getElementById('namePopUp').style.display = 'none';
	}

	function _showWrongNameInfo(usernameElement, nameSendElement) {
		_showWrongNameInfo = function() {};

		usernameElement.classList.add('wrong-name');

		var nameAlert = document.createElement('p');
		var nameAlertMessage = document.createTextNode('NOTE! Specify a nickname between 5 and 25 characters long');
		nameAlert.appendChild(nameAlertMessage);
		nameAlert.classList.add('wrong-name-alert');
		nameSendElement.parentNode.insertBefore(nameAlert, nameSendElement);
	}

	function getUsername() {
		var nameSend = document.getElementById('nameSend');
		var username = document.getElementById('name');

		nameSend.onclick = function() {
			var name = username.value;
			if(name.length > 4 && name.length < 25) {
				_enableChatting(name);
				_hideNamePopUp();
			}
			else {
				_showWrongNameInfo(username, nameSend);
			}
		}
	}

	return {
		getUsername: getUsername
	}

})();


window.onload = chatModule.getUsername;
