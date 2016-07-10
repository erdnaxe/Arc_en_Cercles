/*
 * Information object
 */
module.exports = function Infos(socket) {
  socket = socket;

	this.turn = 1;
	this.turnTotal = 20; 
	this.score = 0;
	this.level = 1;
  this.table = [];
  this.selected = [];

  this.setTurn = function(i) {
    this.turn = i;
	  socket.emit('turn', this.turn);
  }

  this.setTurnTotal = function(i) {
    this.turnTotal = i;
	  socket.emit('turn total', this.turnTotal);
  }

  this.setScore = function(i) {
    this.score = i;
	  socket.emit('score', this.score);
  }

  this.setLevel = function(i) {
    this.level = i;
	  socket.emit('level', this.level);
  }

  this.setTable = function(tbl) {
    this.table = tbl;
    this.selected.length = 0;
	  socket.emit('table', this.table);
  }

  this.setSelected = function(selected) {
    this.selected.push(selected);
	  socket.emit('selected', selected);
  }

  this.sendInfos = function() {
    socket.emit('turn', this.turn);
    socket.emit('turn total', this.turnTotal);
    socket.emit('score', this.score);
    socket.emit('level', this.level);
    socket.emit('table', this.table);
    for (s of this.selected) {
      socket.emit('selected', s);
    }
  }
}

