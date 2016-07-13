var socket = io();

var graphic = new Graphic();

var table = []

graphic.table_size = 22;

// send events to the server
graphic.canvas.addEventListener('mousedown', function(e) {
      // When a mouse clicks, select the circle
      var x = Math.floor(e.offsetX/(512/graphic.table_size));
      var y = Math.floor(e.offsetY/(512/graphic.table_size));

      socket.emit('click', [x, y]);
      });
$('a#reset').click(function(){
      socket.emit('reset');
      });
$('a#level1').click(function(){
      socket.emit('level', 1);
      socket.emit('table size', 16);
      });
$('a#level2').click(function(){
      socket.emit('level', 2);
      socket.emit('table size', 18);
      });
$('a#level3').click(function(){
      socket.emit('level', 3);
      socket.emit('table size', 20);
      });
$('a#level4').click(function(){
      socket.emit('level', 4);
      socket.emit('table size', 22);
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
socket.on('table size', function(i){
      graphic.table_size = i;
      });

