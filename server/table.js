/**
 * Table object
 */

module.exports = function Table() {
   this.table = [];  // The board
   this.selected = [];  // Selection
   this.amount_colors = 4;  // Number of colors

   /**
    * Draw a color between 1 and amount_colors
    */
   this.getRandomColor = function() {
      ent = Math.floor((Math.random() * this.amount_colors) + 1);
      return ent;
   }

   /**
    * Reset everything
    */
   this.reset = function() {
      // Clear selection
      this.selected = [];

      // Regenerate the table
      for (var i=0; i<16; i++) {
         this.table[i] = [];
         for (var j=0; j<16; j++) {
            this.table[i][j] = this.getRandomColor();
         }
      }

      // Play once to remove combinations
      this.play();
   }

   /**
    * Select a circle
    * @return true if success
    */
   this.select = function(pos) {
      if (this.selected.length == 1) {
         // check if the second click is not the same
         if (this.selected[0][0] == pos[0] && this.selected[0][1] == pos[1]) {
            console.log('[Table][select] Same circle');
            return false;
         }

         // check if the second click is next to the first one
         delta_x = this.selected[0][0] - pos[0];
         delta_y = this.selected[0][1] - pos[1];
         if (((delta_x*delta_x) + (delta_y*delta_y)) != 1) {
            console.log('[Table][select] Selection too far');
            return false;
         }
      }

      this.selected.push(pos);
      console.log('[Table][select] Circle selected: ' + pos);
      return true;
   }

   /**
    * Invert selected circles
    */
   this.playFromSelection = function() {
      // Save in memory then erase selection
      circle_1 = this.selected[0];
      circle_2 = this.selected[1];
      this.selected = [];

      // Inverse the pair
      color_1 = this.table[circle_1[0]][circle_1[1]];
      color_2 = this.table[circle_2[0]][circle_2[1]];
      this.table[circle_1[0]][circle_1[1]] = color_2;
      this.table[circle_2[0]][circle_2[1]] = color_1;

      this.play();
   }

   /**
    * Execute algo while new combinations appear
    */
   this.play = function() {
      new_points = 0;
      do {
         console.log('[Table][play] Executing algo');
         points_gained = 0;
         points_gained += this.algo();
         new_points += points_gained;
      } while(points_gained != 0);

      return new_points;
   }

   /**
    * Check for combinations, then destroy them (rip)
    */
   this.algo = function() {
      var points_gained = 0;

      // TODO Write new algo

      return points_gained;
   }
}

