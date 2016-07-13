/**
 * Game object
 */
var Table = require('./table.js');

module.exports = function Game(cli) {
   this.turn = 1;
   this.turn_max = 20; 
   this.level = 1;
   this.score = 0;
   this.table = new Table();
   this.client = cli;

   this.reset = function() {
      console.log('reset the grid');

      // Reset turn & score
      this.turn = 1;
      this.score = 0;

      // Change amount of colors & reset table
      this.table.amount_colors = 4 + this.level;
      this.table.reset();

      // Send everything
      this.client.turn = this.turn;
      this.client.turnTotal = this.turn_max;
      this.client.score = this.score;
      this.client.level = this.level;
      this.client.table = this.table.table;
      this.client.sendInfos();
   }

   this.click = function(pos) {
      // If can select then select and inform the client
      if (this.table.pair.select(pos)) {
         this.client.setSelected(pos);
      }

      if (this.table.pair.areTwoSelected()) {
         this.score += this.table.algo();
         this.turn ++;

         // Check if it's the end
         if (this.turn > this.turn_max) {
            this.reset();
         } else {
            this.client.setScore(this.score);
            this.client.setTurn(this.turn);
            this.client.setTable(this.table.table);
         }
      }
   }

   this.reset();  // Init
}

