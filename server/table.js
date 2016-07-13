/**
 * Table object
 */
var Pair = require('./pair.js');

module.exports = function Table() {
   this.table = [];  // The board
   this.pair = new Pair();  // Selection
   this.amount_colors = 4;  // Number of colors

   this.reset = function() {
      // Clear selection
      this.pair.clear();

      // Generate the table
      this.populateTable();
      this.test();
   }

   this.populateTable = function() {
      // For each case of the table do
      for (var i=0; i<16; i++) {
         this.table[i] = [];
         for (var j=0; j<16; j++) {
            // Draw a color between 1 and amount_colors and set the circle color
            ent = Math.floor((Math.random() * this.amount_colors) + 1);
            this.table[i][j] = ent;
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
         for (i=0; i<16; i++) {
            for (j=0; j<16; j++) {
               ref = this.table[i][j];

               if (ref != 0) {  // If it's not already destroyed
                  for (k=1; i+k<16 && this.table[i+k][j] == ref; k++) {
                     this.table[i+k][j] = 0;
                     points_get ++;
                  }

                  for (m=1; j+m<16 && this.table[i][j+m] == ref; m++) {
                     this.table[i][j+m] = 0;
                     points_get ++;
                  }
               }
            }
         }

         // Regerate
         for (i=0; i<16; i++) {
            for (j=15; j>=0; j--) {
               if(this.table[i][j] == 0) {
                  // Draw a color between 1 and amount_colors and set the circle color
                  ent = Math.floor((Math.random() * this.amount_colors) + 1);
                  this.table[i][j] = ent;
               }
            }
         }

         // Add to the score
         score_to_return += points_get;
      } while (points_get);  // If something was destroyed, then re-execute the algo

      return score_to_return;  // Return pts to add to the score
   }

   this.algo = function() {
      getCircle = function(pos) {
         return this.table[pos[0]][pos[1]];
      }

      points_gained = 0;

      // Save in memory then erase selection
      circle_1 = this.pair.selected_1;
      circle_2 = this.pair.selected_2;
      this.pair.clear();

      // Check if it isn't the same color
      color_1 = this.table[circle_1[0]][circle_1[1]];
      color_2 = this.table[circle_2[0]][circle_2[1]];
      if (color_1 != color_2) {
         this.table[circle_1[0]][circle_1[1]] = color_2;
         this.table[circle_2[0]][circle_2[1]] = color_1;

         // Execute algo
         points_gained += this.test();
      }

      return points_gained;
   }
}

