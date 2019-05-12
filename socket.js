var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    transports: ['polling', 'websocket'],
});
var Redis = require('ioredis');
var redis = new Redis();
io.attach(4567);
redis.subscribe('test-channel', function(err, count) {
});



redis.on('message', function(channel, message) {
    
    message = JSON.parse(message);
    
    //var data = {"id": "Device1","SensorData":"33"}
    io.emit('PostCreatedEvent', message.data);
   // console.log(message.data);
           
    //io.emit(channel + ':' + message.event, message.data);
});
http.listen(8000, function(){
    console.log('Listening on Port 8000');
});