var socket = require('socket.io-client')('http://localhost:3000');
var readline = require('readline');

// Load prompt
var rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.setPrompt('');
rl.prompt();
rl.on('line', function(line) {
      args = line.split(" ");
      x1 = args[0];
      y1 = args[1];
      x2 = args[2];
      y2 = args[3];
      socket.emit('click', [x1, y1]);
      socket.emit('click', [x2, y2]);
      }).on('close',function(){
         process.exit(0);
         });

printInfos = function () {
   table_srt = '';
   table.forEach(function (line){
         table_srt += line.join(' ') + ' ';
         });
   console.log(turn + ' ' + turn_total + ' ' + score + ' ' + table_srt);
}

// when server change infos
socket.on('turn', function(i){ turn = i; });
socket.on('turn total', function(i){ turn_total = i; });
socket.on('score', function(i){ score = i; });
socket.on('table', function(tbl){ table = tbl; printInfos(); });

