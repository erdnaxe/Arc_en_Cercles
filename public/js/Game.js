/**
 * Game object
 */
function Game () {
	turn = 1;
	turn_max = 20; 
	level = 1;
	score = 0;

	table = new Table();
	infos = new Infos();

	this.getLevel = function() {
		return level;
	};

	this.setLevel = function(lv) {
		// Set the level then launch a new game
		level = lv;

		// Change amount of colors
		table.setAmountColors(4+lv);

		this.reset();
	};

	this.reset = function() {
		// Reset turn & score
		turn = 1;
		score = 0;
		infos.setTurn(1);
		infos.setTurnTotal(turn_max);
		infos.setScore(0);
		infos.setLevel(level);

		// Reset table
		table.reset();
	}
	
	this.incrementTurn = function() {
		turn ++;
		infos.setTurn(turn);
	}
	
	this.addToScore = function(i) {
		score += i;
		infos.setScore(score);
	}

	this.mouseClick = function(pos) {
		// Make the selection & check with algo
		var points_gained = table.setSelected(pos);

		// Increment the turn only if new points
		if (points_gained) {
			this.addToScore(points_gained);
			this.incrementTurn();
		}

		// Check if it's the end
		if (turn > turn_max) {
			this.reset();
		}
	}

	graphic.canvas.addEventListener('mousedown', function(e) {
		// When a mouse clicks, select the circle
		var x = Math.floor(e.offsetX/32);
		var y = Math.floor(e.offsetY/32);

		game.mouseClick([x, y]);
	});

	this.reset();
}


/**
 * Return square distance between two points
 */
function squareDistance(p1, p2) {
	return (p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1]);
}
