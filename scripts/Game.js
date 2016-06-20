/**
 * Game object
 */
function Game () {
	level = 1;
	turn = 1;
	turn_total = 20; 
	score = 0;
	table = [];
	selected_1 = false;
	selected_2 = false;
	graphic = new Graphic();

	this.getLevel = function() {
		return level;
	};

	this.setLevel = function(lv) {
		level = lv;
		this.newGame();
	};

	this.increaseLevel = function() {
		if (level < 4) {
			this.setLevel(level + 1);
		}
	};

	this.decreaseLevel = function() {
		if (level > 1) {
			this.setLevel(level - 1);
		}
	};

	this.populateTable = function() {
		for (var i=0; i<16; i++) {
			table[i] = [];
			for (var j=0; j<16; j++) {
				table[i][j] =  Math.floor((Math.random() * 5) + 1);
				graphic.drawCircle([i, j], false);
			}
		}
	}

	this.newGame = function() {
		// Reset
		turn = 1;
		turn_total = 20; 
		score = 0;
		selected_1 = false;
		selected_2 = false;

		// Recreate the table
		graphic.refreshInfo(turn, turn_total, score, level);
		this.populateTable();
	}

	var setSelected = function(pos) {
		// Select / unselect
		if (selected_1[0] == pos[0] && selected_1[1] == pos[1]) {
			graphic.drawCircle(pos, false);
			selected_1 = false;
		} else if (!selected_1) {
			graphic.drawCircle(pos, true);
			selected_1 = pos;
		} else if (!selected_2) {
			if (selected_1 && squareDistance(pos, selected_1) != 1) {
				// If not on a size, then ignore the click
				return;
			} else {
				graphic.drawCircle(pos, true);
				selected_2 = pos;
			}
		}

		// If two selected then execute algo
		if (selected_1 && selected_2) {
			// Erase selection
			graphic.drawCircle(this.selected_1, false);
			selected_1 = false;
			graphic.drawCircle(this.selected_2, false);
			selected_2 = false;

			// Count turn
			turn++;

			// Refresh info
			graphic.refreshInfo(turn, turn_total, score, level);
		}
	}

	graphic.canvas.addEventListener('mousedown', function(e) {
		var x = Math.floor(e.offsetX/32);
		var y = Math.floor(e.offsetY/32);
		console.log('Click at pos ', x, y);

		setSelected([x, y]);
	});
}


/**
 * Return square distance between two points
 */
function squareDistance(p1, p2) {
	return (p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1]);
}
