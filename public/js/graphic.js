/*
 * Graphic object (canvas)
 */
function Graphic () {
   this.canvas = document.getElementById("boardCanvas");
   this.table_size = 22;

   var context = this.canvas.getContext("2d");

   var getColor = function(i) {
      switch (i) {
         case 1:	return '#cc0000'; break;
         case 2: return '#edd400'; break;
         case 3: return '#73d216'; break;
         case 4: return '#3465a4'; break;
         case 5: return '#75507b'; break;
         case 6: return '#c17d11'; break;
         case 7: return '#555753'; break;
         case 8: return '#d3d7cf'; break;
         default: return '#000000'; break;
      }
   }

   this.drawCircle = function(pos, selected, ref) {
      var color = getColor(ref);

      x = (512/this.table_size)*pos[0];
      y = (512/this.table_size)*pos[1];

      // Clean up
      context.clearRect (x , y, (512/this.table_size), (512/this.table_size));

      // Draw a circle
      context.beginPath();
      context.arc((256/this.table_size)+x, (256/this.table_size)+y, (256/this.table_size)-2, 0, 2*Math.PI);
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
      for (var i=0; i<this.table_size; i++) {
         for (var j=0; j<this.table_size; j++) {
            // Draw a color between 1 and amount_colors and set the circle color
            this.drawCircle([i, j], false, table[i][j]);
         }
      }
   }
}

