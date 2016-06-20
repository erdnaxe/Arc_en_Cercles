/*
 * Graphic part (canvas & info)
 */
function Graphic () {
	this.canvas = document.getElementById("boardCanvas");
	var context = this.canvas.getContext("2d");

	var getColor = function(i) {
		switch (i) {
			case 1:
				return 'red';
				break;
			case 2:
				return 'green';
				break;
			case 3:
				return 'orange';
				break;
			case 4:
				return 'violet';
				break;
			case 5:
				return 'blue';
				break;
			default:
				return 'black';
				break;
		}
	}

	this.drawCircle = function(pos, selected) {
		var color = getColor(table[ pos[0] ][ pos[1] ]);

		x = 32*pos[0];
		y = 32*pos[1];

		// Clean up
		context.clearRect (x , y, 32, 32);

		// Draw a circle
		context.beginPath();
		context.arc(16+x, 16+y, 14, 0, 2*Math.PI);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 2;
		if (selected) {
			context.strokeStyle = 'white';
		} else {
			context.strokeStyle = 'black';
		}
		context.stroke();
	}

	this.refreshInfo = function(turn, turn_total, score, level) {
		document.getElementById("turn").innerHTML = turn;
		document.getElementById("turnTotal").innerHTML = turn_total;
		document.getElementById("score").innerHTML = score;
		document.getElementById("level").innerHTML = level;
		document.title = 'Arc en Cercles - Niveau ' + level;
	}
}
