var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Sequelize = require('sequelize');
var config = require('./config.json');
var Game = require('./game.js');
var Client = require('./client.js');

// Load database
var sequelize = new Sequelize('sqlite://data.sqlite3');

// Load webserver
app.use(express.static('./public'));  // Static files
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', function(req, res){ 
  res.render('index', {});
});
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
var serverPort = process.env.PORT || config.port;
http.listen(serverPort, function() {
  console.log("Server is listening on port " + serverPort);
});

// If global game then init game before socket
if (config.global_game) {
  client = new Client(io);
  game = new Game(client);
}

// Load socket
io.on('connection', function(socket){
  console.log('user connected');

  if (!config.global_game) {
    client = new Client(socket);
    game = new Game(client);
  } else {
    // Send game status
    client.sendInfos();
  }

  socket.on('reset', function(){
    game.reset();
  });
  socket.on('click', function(coord){
    game.mouseClick(coord);
  });
  socket.on('level', function(i){
    game.level = i;
    game.reset();
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

