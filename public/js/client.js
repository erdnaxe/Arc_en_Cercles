var socket = io();

var graphic = new Graphic();

var table = []

// send events to the server
graphic.canvas.addEventListener('mousedown', function(e) {
      // When a mouse clicks, select the circle
      var x = Math.floor(e.offsetX/32);
      var y = Math.floor(e.offsetY/32);

      socket.emit('click', [x, y]);
      });
$('a#reset').click(function(){
      socket.emit('reset');
      });
$('a#level1').click(function(){
      socket.emit('level', 1);
      });
$('a#level2').click(function(){
      socket.emit('level', 2);
      });
$('a#level3').click(function(){
      socket.emit('level', 3);
      });
$('a#level4').click(function(){
      socket.emit('level', 4);
      });

// when server change infos
socket.on('turn', function(i){
      $('#turn').text(i);
      });
socket.on('turn total', function(i){
      $('#turnTotal').text(i);
      });
socket.on('score', function(i){
      $('#score').text(i);
      });
socket.on('level', function(i){
      $('#level').text(i);
      });
socket.on('selected', function(selected){
      selected.forEach(function(pos) {
            graphic.drawCircle(pos, true, table[pos[0]][pos[1]]);
            });
      });
socket.on('table', function(tbl){
      table = tbl
      graphic.drawTable(table);
      });

