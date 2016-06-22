/**
 * Game object
 */
function Game () {
	turn = 1;
	turn_max = 20; 
	score = 0;
	selected_1 = false;
	selected_2 = false;

	color_max = 5;  // Number of colors
	graphic = new Graphic();

	level = 1;
	level_max = 4;

	table = [];

	this.getLevel = function() {
		return level;
	};

	this.setLevel = function(lv) {
		// Set the level then launch a new game
		level = lv;
		this.newGame();
	};

	this.increaseLevel = function() {
		// Make sure we don't go above level_max
		if (level < level_max) {
			this.setLevel(level + 1);
		}
	};

	this.decreaseLevel = function() {
		// Make sure we don't go under 1
		if (level > 1) {
			this.setLevel(level - 1);
		}
	};

	var getColorRef = function(pos) {
		// Return the integer witch identify the color of the cas at pos
		return table[pos[0]][pos[1]];
	}

	var setCircle = function(pos, color = 0) {
		if (color) {
			// Set the color of a circle at pos with color.
			table[pos[0]][pos[1]] =  color;
		} else {
			// Get the color
			color = getColorRef(pos);
		}

		// Detect if the circle is in the selection then draw it
		if ((selected_1[0] == pos[0] && selected_1[1] == pos[1]) || (selected_2[0] == pos[0] && selected_2[1] == pos[1])) {
			graphic.drawCircle(pos, true, color);
		} else {
			graphic.drawCircle(pos, false, color);
		}
	};

	this.populateTable = function() {
		// For each case of the table do
		for (var i=0; i<16; i++) {
			table[i] = [];
			for (var j=0; j<16; j++) {
				// Draw a color between 1 and color_max
				var ent = Math.floor((Math.random() * color_max) + 1);

				// Set the circle
				setCircle([i, j], ent);
			}
		}
	}

	this.newGame = function() {
		// Reset
		turn = 1;
		score = 0;
		selected_1 = false;
		selected_2 = false;

		// Recreate the table
		graphic.refreshInfo(turn, turn_max, score, level);
		this.populateTable();
	}

	var test = function(pos) {
		// Get the reference color
		var ref = getColorRef(pos);
		console.log('Testing case ', pos, ' with color ', ref);

		// Explore to the right
		var x = pos[0];
		while (getColorRef([x, pos[1]]) == ref) {
			console.log('Same color: ', [x, pos[1]]);
			//TODO

			x++;
		}

		// Explore downward
		var y = pos[1];
		while (getColorRef([pos[0], y]) == ref) {
			console.log('Same color: ', [pos[0], y]);
			//TODO

			y++;
		}
	}

	this.setSelected = function(pos) {
		// Select / unselect
		if (selected_1[0] == pos[0] && selected_1[1] == pos[1]) {
			selected_1 = false;
			setCircle(pos);
		} else if (!selected_1) {
			selected_1 = pos;
			setCircle(pos);
		} else if (!selected_2) {
			if (selected_1 && squareDistance(pos, selected_1) != 1) {
				// If not on a size, then ignore the click
				return;
			} else {
				selected_2 = pos;
				setCircle(pos);
			}
		}

		// If two selected then execute algo
		if (selected_1 && selected_2) {
			// Save in memory then erase selection
			var circle_1 = selected_1;
			var circle_2 = selected_2;
			selected_1 = false;
			selected_2 = false;

			// Check if it isn't the same color
			if (getColorRef(circle_1) != getColorRef(circle_2)) {
				var color_1 = getColorRef(circle_1);
				setCircle(circle_1, getColorRef(circle_2));
				setCircle(circle_2, color_1);
				
				// Execute algo on the two circles
				test(circle_1);
				test(circle_2);
			}

			// Refresh info & draw circles
			turn ++;
			graphic.refreshInfo(turn, turn_max, score, level);
			setCircle(circle_1);
			setCircle(circle_2);
		}

		// Check if it's the end
		if (turn > turn_max) {
			this.newGame();
		}
	}

	graphic.canvas.addEventListener('mousedown', function(e) {
		// When a mouse clicks, select the circle
		var x = Math.floor(e.offsetX/32);
		var y = Math.floor(e.offsetY/32);

		game.setSelected([x, y]);
	});
}


/**
 * Return square distance between two points
 */
function squareDistance(p1, p2) {
	return (p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1]);
}
