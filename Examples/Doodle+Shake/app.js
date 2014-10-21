var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var large = require('./routes/large');
var shake = require('./routes/shake');


var app = express(); 
server = require('http').createServer(app),
io=require('socket.io').listen(server, {'destroy buffer size': Infinity}),
//io.disable('heartbeats'),
//io.set('log level', 1),
//io = require('socket.io').listen(server, { log: false }),


//array objects for names,x,y coordinates and colour
socketid = [];

var count=0;

server.listen(3000);
app.get('/painting',large.large);
app.get('/shake',shake.shake);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;


//to create socket connection

io.sockets.on('connection',function(socket){

    //to get the client x, y coordinate and store it in the corresponding arrays
    socket.on('sendxy',function(data){

      //to get the index of the corresponding user
     
       
      // to emits the x,y coordinate of all the users to all the clients
      io.sockets.emit('sendxytoall',{data:data});

});




});


