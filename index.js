// initialized server
var express = require('express');
var app = express();
var server = require('http').Server(app);

var port = process.env.PORT || 3000  //if env var define containing port use it, if not use 3000 default

server.listen(port,function(){
	console.log("Listening on port*: " + port);
});

app.use(express.static(__dirname)); //Use static files in current directory

app.get('/', function (request,response){
	response.sendFile(__dirname + '/index.html');
});