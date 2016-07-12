var express = require('express');
var i18n = require("i18n");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var levelup = require('levelup');
var config = require('./config.json');
var Game = require('./game.js');
var Client = require('./client.js');

// Load database
var db = levelup('./data')

// Load locales
i18n.configure({ directory: './locales' });

// Load webserver
app.use(i18n.init);  // Use browser language
app.use(express.static('./public'));  // Static files
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', function(req, res){
      res.render('index', {});
      });
app.use(function(req, res, next) {
      res.redirect('/');  // Redirect the user if 404
      });
var serverPort = process.env.PORT || config.port;
http.listen(serverPort, function() {
      console.log("Server is listening on port " + serverPort + ', web client on http://localhost:' + serverPort + '/');
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

