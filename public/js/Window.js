/*
 * Window part
 */

function aboutWindow() {
	alert('About this games... I can say something is coming here, maybe ?');
	console.log('About windows');
}

/*
 * MenuBar
 */
if (typeof nw !== 'undefined') {
	// Windows nw.js mode
	var menubar = new nw.Menu({ type: 'menubar' });

	// Get the system platform (for future Mac OS support)
	var os = require('os');
	console.log('You are running on ', os.platform());
	//menubar.createMacBuiltin("arc_en_cercles");

	// Game menu
	var game_submenu = new nw.Menu();
	game_submenu.append(new nw.MenuItem({
		label: 'Nouvelle partie',
		click: function(){ game.newGame() }
	}));
	game_submenu.append(new nw.MenuItem({
		label: 'À propos',
		click: aboutWindow
	}));
	game_submenu.append(new nw.MenuItem({
		label: 'Quitter',
		click: nw.Window.get().close
	}));
	menubar.append(new nw.MenuItem({
		label: 'Jeu',
		submenu: game_submenu
	}));

	// Menu to select level
	var level_submenu = new nw.Menu();
	level_submenu.append(new nw.MenuItem({
		label: 'Niveau facile' ,
		click: function(){ game.setLevel(1) }
	}));
	level_submenu.append(new nw.MenuItem({
		label: 'Niveau intermédière',
		click: function(){ game.setLevel(2) }
	}));
	level_submenu.append(new nw.MenuItem({
		label: 'Niveau difficile',
		click: function(){ game.setLevel(3) }
	}));
	level_submenu.append(new nw.MenuItem({
		label: 'Niveau impossible',
		click: function(){ game.setLevel(4) }
	}));
	menubar.append(new nw.MenuItem({
		label: 'Niveau',
		submenu: level_submenu
	}));

	// Show the menu !
	nw.Window.get().menu = menubar;
}
