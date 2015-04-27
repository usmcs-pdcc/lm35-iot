var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

http.listen(2222, function() {
	console.log('listening on *:2222')
});

// mraa
var mraa = require("mraa");
console.log("MRAA version: " + mraa.getVersion());

var a = new mraa.Aio(0);

function capturesensor(socket) {
    
    setInterval( function() {
    var b = a.read();
    
    b = b * 0.48826125;
    console.log("Celcius: " + b);
    socket.emit("message", b);
    }, 4000);
}

io.on('connection', function (socket) {
    console.log('user is connected');
    
    capturesensor(socket);
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
