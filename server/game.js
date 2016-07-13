/**
 * Game object
 */
var Table = require('./table.js');

module.exports = function Game(socket) {
   socket = socket;

   this.turn = 1;
   this.turnTotal = 20; 
   this.score = 0;
   this.level = 1;
   this.table = new Table();

   /**
    * Reset everything
    */
   this.reset = function() {
      // Reset turn & score
      this.turn = 1;
      this.score = 0;

      // Change amount of colors & reset table
      this.table.amount_colors = 4 + this.level;
      this.table.reset();

      // Update client
      this.sendInfos();
   }

   this.sendInfos = function() {
      socket.emit('turn', this.turn);
      socket.emit('turn total', this.turnTotal);
      socket.emit('score', this.score);
      socket.emit('level', this.level);
      socket.emit('table size', this.table.table_size);
      socket.emit('table', this.table.table);
      socket.emit('selected', this.table.selected);

      console.log('[Game][sendInfos] Client refreshed');
   }

   /**
    * Select the clicked circle
    * Called on a click
    */
   this.click = function(pos) {
      // If can select then select and inform the client
      if (this.table.select(pos)) {
         socket.emit('selected', this.table.selected);
      }

      // Play with the new selection
      this.play();
   }

   /**
    * Play with the selection
    */
   this.play = function() {
      // If can play then play
      if (this.table.selected.length == 2) {
         this.score += this.table.playFromSelection();
         this.turn += 1;

         // Update client
         this.sendInfos();
      }

      // If it's the end then reset
      if (this.turn > this.turn_max) {
         // TODO Ask for reset
         this.reset();
      }
   }

   this.reset();  // Init
}

