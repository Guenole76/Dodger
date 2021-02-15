var dodger = {
	preload: function() {
		// Charger les fichiers
		game.load.image('fond', 'assets/fond.jpg');
		game.load.image('player', 'assets/electru.jpg')
	},
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0, 0, 'fond');
		this.player =  game.add.sprite(600, 800, 'player');

		game.physics.arcade.enable(this.player);

		this.cursors = game.input.keyboard.createCursorKeys();
	},
	update: function() {
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -300;
		}
		
	}
};

var game = new Phaser.Game(1400, 1000, Phaser.AUTO, 'gameDiv');

game.state.add('dodger',dodger);
game.state.start('dodger');