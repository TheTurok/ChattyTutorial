var express = require('express');
var app = express();
var server = require('http').Server(app);




var io = require('socket.io')(server);


io.on('connection', fucntion(socket) { //on every connection do this

	//tell all clients someone connected
	io.emit('userjoined', socket.id); //with their id

});