/**
 * Game object
 */
var Table = require('./table.js');

module.exports = function Game(cli) {
	this.turn = 1;
	this.turn_max = 20; 
	this.level = 1;
	this.score = 0;

	table = new Table();
	client = cli

	this.reset = function() {
    console.log('reset the grid');

    // Reset turn & score
    this.turn = 1;
    this.score = 0;
    client.setTurn(this.turn);
    client.setTurnTotal(this.turn_max);
    client.setScore(this.score);
    client.setLevel(this.level);

    // change amount of colors
		table.setAmountColors(4+this.level);

    // Reset table
    table.reset();
    client.setTable(table.table);
	}

	this.mouseClick = function(pos) {
	  // If can select then select and inform the client
	  if (table.pair.select(pos)) {
	    client.setSelected(pos);
	  }

    if (table.pair.areTwoSelected()) {
      // Check with algo
      points_gained = table.algo();

      // Increment the turn only if new points
      this.score += points_gained;
      this.turn ++;
      client.setScore(this.score);
      client.setTurn(this.turn);

      // Show the new table
      client.setTable(table.table);

      // Check if it's the end
      if (this.turn > this.turn_max) {
        this.reset();
      }
    }
	}

	this.reset();
}

