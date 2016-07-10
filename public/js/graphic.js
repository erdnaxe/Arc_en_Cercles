/*
 * Graphic object (canvas)
 */
function Graphic () {
	this.canvas = document.getElementById("boardCanvas");
	var context = this.canvas.getContext("2d");

	var getColor = function(i) {
		switch (i) {
			case 1:
				return '#FF1F13';
				break;
			case 2:
				return '#FFD713';
				break;
			case 3:
				return '#562AE5';
				break;
			case 4:
				return '#12EC2D';
				break;
			case 5:
				return '#FF9F13';
				break;
			case 6:
				return '#D4FC13';
				break;
			case 7:
				return '#E211E2';
				break;
			case 8:
				return '#2183E2';
				break;
			default:
				return '#000000';
				break;
		}
	}

	this.drawCircle = function(pos, selected, ref) {
		var color = getColor(ref);

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

	this.drawTable = function(table) {
	  // For each case of the table do
		for (var i=0; i<16; i++) {
			for (var j=0; j<16; j++) {
				// Draw a color between 1 and amount_colors and set the circle color
				this.drawCircle([i, j], false, table[i][j]);
			}
		}
	}
}
