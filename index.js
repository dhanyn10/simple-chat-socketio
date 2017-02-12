//dependencies
var app     = require('express')();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var count   = 0;

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    count++;
    io.emit('calc', {count : count});
    
    console.log("client : " + count);
    console.log('a user connected');
    
    //notify that a user disconnected from chat
    socket.on('disconnect', function(){
        console.log('user disconnect');
        
        count--;
        io.emit('calc', {count : count});
        console.log('user disconnect');
        
    });
    
    //when event "chat message" has run
    socket.on('chat message', function(msg){
        //display message on command prompt
        console.log('message : ' + msg);
        //....
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening port 3000');
});