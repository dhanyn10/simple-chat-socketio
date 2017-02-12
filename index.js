//dependencies
var app     = require('express')();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

//set default port when launch the app
var port    = process.env.PORT || 3000;

//variable to store how many users online
var count   = 0;

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    //when a user online, +1 value to count
    count++;
    //send value of "count" to index.html, known as "count" variable
    //index.html will start to retrieve data at event "calc"
    io.emit('calc', {count : count});
    
    console.log("client : " + count);
    console.log('a user connected');
    
    //notify that a user disconnected from chat
    socket.on('disconnect', function(){
        
        //check user disconnected
        console.log('user disconnect');
        
        //when a user offline, -1 value to count
        count--;
        io.emit('calc', {count : count});
        console.log('user disconnect');
        
    });
    
    //when event "chat message" has run
    socket.on('chat message', function(msg){
        //display message on command prompt
        console.log('message : ' + msg);
        //return data message to index.html
        io.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening port ' + port);
});