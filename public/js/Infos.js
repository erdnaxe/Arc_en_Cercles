/*
 * Information object
 */
function Infos () {
	this.setTurn = function(i) {
		$('#turn').text(i);
	}

	this.setTurnTotal = function(i) {
		$('#turnTotal').text(i);
	}

	this.setScore = function(i) {
		$('#score').text(i);
	}

	this.setLevel = function(i) {
		$('#level').text(i);
		document.title = 'Arc en Cercles - Niveau ' + i;
	}
}
