/*
 * Pair of two circle
 */
module.exports = function Pair(socket) {
   socket = socket;

   this.selected_1 = false;
   this.selected_2 = false;

   /**
    * Select a circle
    * @return true if success
    */
   this.select = function(pos) {
      if (!this.selected_1) {
         this.selected_1 = pos;
         return true;
      } else if (!this.selected_2) {
         // check if the second click is not the same
         if (this.selected_1[0] == pos[0] && this.selected_1[1] == pos[1]) {
            this.selected_1 = false;
            return false;
         }

         // check if the second click is next to the first one
         if (this.distanceFromSelected(pos) == 1) {
            this.selected_2 = pos;
            return true;
         }
      }

      return false;
   }

   /**
    * Always deselect the last selected
    */
   this.deselect = function() {
      if (this.selected_2) {
         this.selected_2 = false;
      } else if (this.selected_1) {
         this.selected_1 = false;
      } else {
         console.log('[Pair] Nothing to deselect');
      }
   }

   /**
    * Clear the pair
    */
   this.clear = function() {
      this.selected_1 = false;
      this.selected_2 = false;
   }

   /**
    * Give the distance between the selected point and the coords pos
    */
   this.distanceFromSelected = function(pos) {
      if (this.selected_1) {
         delta_x = this.selected_1[0] - pos[0]
            delta_y = this.selected_1[1] - pos[1]
            return (delta_x*delta_x) + (delta_y*delta_y);
      } else {
         console.log('[Pair] Can\'t calculate distance: no point selected');
      }
   }

   this.areTwoSelected = function() {
      if (this.selected_1 && this.selected_2) {
         return true;
      } else {
         return false;
      }
   }
}

