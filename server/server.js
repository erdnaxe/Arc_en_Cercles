var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Game = require('./game.js');
var Client = require('./client.js');

var config = require('./config.json');

app.use(express.static('./public'));

// Use PUG as view engine
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', function(req, res){
  res.render('index', {});
});

// If global game then init game here
if (config.global_game) {
  client = new Client(io);
  game = new Game(client);
}

// Each connection is a new game
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

// Launch web server
var serverPort = process.env.PORT || config.port;
http.listen(serverPort, function() {
  console.log("Server is listening on port " + serverPort);
});
