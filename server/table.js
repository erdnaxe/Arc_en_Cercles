/**
 * Table object
 */
var Pair = require('./pair.js');

module.exports = function Table() {
	// The board
	this.table = [];

	// Number of colors
	amount_colors_max = 8;  // Number of colors
	amount_colors = 4;

	this.pair = new Pair();

	this.reset = function(pos) {
		// Clear selection
		this.pair.clear();

		// Generate the table
		this.populateTable();
		this.test();
	}

	this.setAmountColors = function(n) {
		// Change the amount of colors in the next game
		if (n > 1 && n <= amount_colors_max) {
			amount_colors = n;
		}
	}
	
	this.getCircle= function(pos) {
		// Return the integer witch identify the color of the cas at pos
		return this.table[pos[0]][pos[1]];
	}

	this.setCircle = function(pos, color = 0) {
		if (color) {
			// Set the color of a circle at pos with color.
			this.table[pos[0]][pos[1]] =  color;
		} else {
			// Get the color
			color = this.getCircle(pos);
		}

		// Detect if the circle is in the selection then draw it
		//if ((this.selected_1[0] == pos[0] && this.selected_1[1] == pos[1]) || (this.selected_2[0] == pos[0] && this.selected_2[1] == pos[1])) {
			//graphic.drawCircle(pos, true, color);
		//} else {
			//graphic.drawCircle(pos, false, color);
		//}
	};

	this.removeCircle = function(pos) {
		// Set the color to 0 at pos
		this.table[pos[0]][pos[1]] =  0;

		// Draw the circle
		//graphic.drawCircle(pos, false, 0);
	};

	this.populateTable = function() {
		// For each case of the table do
		for (var i=0; i<16; i++) {
			this.table[i] = [];
			for (var j=0; j<16; j++) {
				// Draw a color between 1 and amount_colors and set the circle color
				var ent = Math.floor((Math.random() * amount_colors) + 1);
				this.setCircle([i, j], ent);
			}
		}
	}

	this.test = function() {
		var score_to_return = 0;

		do {
			// Explore the table to remove combinations
			var points_get = 0;  // Points in one exploration

			// For each case of the table do
			var ref = null;
			for (var i=0; i<16; i++) {
				for (var j=0; j<16; j++) {
					ref = this.getCircle([i, j]);

					if (ref != 0) {  // If it's not already destroyed
						for (var k=1; i+k<16 && this.getCircle([i+k, j]) == ref; k++) {
							this.removeCircle([i+k, j]);
							points_get ++;
						}

						for (var m=1; j+m<16 && this.getCircle([i, j+m]) == ref; m++) {
							this.removeCircle([i, j+m]);
							points_get ++;
						}
					}
				}
			}

			// Regerate
			for (var i=0; i<16; i++) {
				for (var j=15; j>=0; j--) {
					if(this.getCircle([i, j]) == 0) {
						// Draw a color between 1 and amount_colors
						var ent = Math.floor((Math.random() * amount_colors) + 1);

						// Set the circle
						this.setCircle([i, j], ent);
					}
				}
			}

			// Add to the score
			score_to_return += points_get;
		} while (points_get);  // If something was destroyed, then re-execute the algo

		return score_to_return;  // Return pts to add to the score
	}

	this.algo = function() {
		points_gained = 0;

		// Save in memory then erase selection
		var circle_1 = this.pair.selected_1;
		var circle_2 = this.pair.selected_2;
		this.pair.clear();

		// Check if it isn't the same color
		if (this.getCircle(circle_1) != this.getCircle(circle_2)) {
			var color_1 = this.getCircle(circle_1);
			this.setCircle(circle_1, this.getCircle(circle_2));
			this.setCircle(circle_2, color_1);

			// Execute algo
			points_gained += this.test();
		}

		// Draw circles
		this.setCircle(circle_1);
		this.setCircle(circle_2);

		return points_gained;
	}
}

