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
	this.client = cli

	this.reset = function() {
    console.log('reset the grid');

    // Reset turn & score
    this.turn = 1;
    this.score = 0;
    this.client.setTurn(this.turn);
    this.client.setTurnTotal(this.turn_max);
    this.client.setScore(this.score);
    this.client.setLevel(this.level);

    // change amount of colors
		this.table.setAmountColors(4+this.level);

    // Reset table
    this.table.reset();
    this.client.setTable(this.table.table);
	}

	this.mouseClick = function(pos) {
	  // If can select then select and inform the client
	  if (this.table.pair.select(pos)) {
	    this.client.setSelected(pos);
	  }

    if (this.table.pair.areTwoSelected()) {
      this.score += this.table.algo();
      this.turn ++;
      this.client.setScore(this.score);
      this.client.setTurn(this.turn);

      // Show the new table
      this.client.setTable(this.table.table);

      // Check if it's the end
      if (this.turn > this.turn_max) {
        this.reset();
      }
    }
	}

	this.reset();
}

