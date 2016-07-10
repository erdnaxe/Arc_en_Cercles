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
    if (line === "quit") {
      rl.close();
    } else if (line.startsWith("click")) {
      args = line.split(" ");
      x = args[1];
      y = args[2];
      socket.emit('click', [x, y]);
    } else if (line === "reset") {
      socket.emit('reset');
    } else if (line.startsWith("level")) {
      args = line.split(" ");
      i = args[1];
      socket.emit('level', i);
    } else {
      rl.prompt();
    }
}).on('close',function(){
    process.exit(0);
});

// when server change infos
socket.on('turn', function(i){
  console.log('turn ' + i);
});

socket.on('turn total', function(i){
  console.log('turn total ' + i);
});

socket.on('score', function(i){
  console.log('score ' + i);
});

socket.on('level', function(i){
  console.log('level ' + i);
});

socket.on('selected', function(selected){
  console.log('selected ' + selected);
});

// when server change table
socket.on('table', function(tbl){
  console.log('table ' + tbl);
});

