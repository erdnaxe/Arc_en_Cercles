/**
 * Game object
 */
function Game () {
	turn = 1;
	turn_max = 20; 
	level = 1;
	level_max = 4;
	score = 0;

	graphic = new Graphic();
	table = new Table();

	this.getLevel = function() {
		return level;
	};

	this.setLevel = function(lv) {
		// Set the level then launch a new game
		level = lv;
		this.newGame();
	};

	this.newGame = function() {
		// Reset turn & score
		turn = 1;
		score = 0;
		graphic.refreshInfo(turn, turn_max, score, level);

		// Reset table
		table.reset();
	}

	this.mouseClick = function(pos) {
		// Make the selection & check with algo
		var points_gained = table.setSelected(pos);

		// Increment the turn only if new points
		if (points_gained) {
			score += points_gained;
			turn ++;
		}

		// Check if it's the end
		if (turn > turn_max) {
			this.newGame();
		}

		// Refresh infos
		graphic.refreshInfo(turn, turn_max, score, level);
	}

	graphic.canvas.addEventListener('mousedown', function(e) {
		// When a mouse clicks, select the circle
		var x = Math.floor(e.offsetX/32);
		var y = Math.floor(e.offsetY/32);

		game.mouseClick([x, y]);
	});
}


/**
 * Return square distance between two points
 */
function squareDistance(p1, p2) {
	return (p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1]);
}
