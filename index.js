// initialized server
var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

var port = process.env.PORT || 3000  //if env var define containing port use it, if not use 3000 default

server.listen(port,function(){
	console.log("Listening on port*: " + port);
});

app.use(express.static(__dirname)); //Use static files in current directory

app.get('/', function (request,response){
	response.sendFile(__dirname + '/index.html');
});

app.get('/onlineusers', function(request,response){
	response.send(io.sockets.adapter.rooms);
});

io.on('connection', function(socket) { //on every connection do this
	console.log('A user connected:' + socket.id);

	//tell all clients someone connected
	io.emit('userjoined', socket.id); //with their id

	//cleint send message
	socket.on('chatmessage', function(message){
		//emit this event to all clients
		io.emit('chatmessage', message);
	});


	socket.on('disconnect', function(){ //on idsconnect
		console.log('User Lef:t' + socket.id)
		//tell clients someone disconnected
		socket.broadcast.emit('userleft', socket.id);
	});

}); 