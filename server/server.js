var express = require('express');
var i18n = require("i18n");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var levelup = require('levelup');
var config = require('./config.json');
var Game = require('./game.js');

// Load database
var db = levelup('./data');

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
      console.log("[Server] Listening on port " + serverPort + ', web client on http://localhost:' + serverPort + '/');
      });

// If global game then init game before socket
if (config.global_game) {
   game = new Game(io);
}

// Load socket
io.on('connection', function(socket){
      console.log('[Server] User connected');

      if (!config.global_game) {
         game = new Game(socket);
      } else {
         game.sendInfos();
      }

      socket.on('reset', function(){
            game.reset();
            });
      socket.on('click', function(coord){
            game.click(coord);
            });
      socket.on('level', function(i){
            game.level = i;
            game.reset();
            });
      socket.on('disconnect', function(){
            console.log('[Server] User disconnected');
            });
});

