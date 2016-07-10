/*
 * Information object
 */
module.exports = function Infos(socket) {
  socket = socket;

  this.setTurn = function(i) {
	  socket.emit('turn', i);
  }

  this.setTurnTotal = function(i) {
	  socket.emit('turn total', i);
  }

  this.setScore = function(i) {
	  socket.emit('score', i);
  }

  this.setLevel = function(i) {
	  socket.emit('level', i);
  }

  this.setTable = function(table) {
	  socket.emit('table', table);
  }

  this.setSelected = function(selected) {
	  socket.emit('selected', selected);
  }

  this.clearSelected = function() {
	  socket.emit('clear selected');
  }
}

