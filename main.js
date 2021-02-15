var dodger = {
	preload: function() {
		// Charger les fichiers
		game.load.image('fond', 'assets/fond.jpg');
	},
	create: function() {
		
		game.add.sprite(0, 0, 'fond');
	},
	update: function() {
		
	}
};

var game = new Phaser.Game(1400, 1000, Phaser.AUTO, 'gameDiv');

game.state.add('dodger',dodger);
game.state.start('dodger');