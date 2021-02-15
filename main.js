var dodger = {
	preload: function() {
		// Charger les fichiers
		game.load.image('fond', 'assets/fond.jpg');
		game.load.image('player', 'assets/electru.jpg')
		game.load.image('enemi', 'assets/forbiden.png')
	},
	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0, 0, 'fond');
		this.player =  game.add.sprite(600, 800, 'player');

		game.physics.arcade.enable(this.player);

		this.cursors = game.input.keyboard.createCursorKeys();

		this.enemis = game.add.group();

		this.timer = game.time.events.loop(200, this.addEnemi, this);
	},
	update: function() {
		game.physics.arcade.overlap(this.player, this.enemis, this.restartGame, null, this);
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -600;
		}
		if(this.cursors.right.isDown){
			this.player.body.velocity.x = 600;
		}
		if(this.cursors.up.isDown){
			this.player.body.velocity.y = -600;
		}
		if(this.cursors.down.isDown){
			this.player.body.velocity.y = 600;
		}
		if(this.player.inWorld == false){
			this.restartGame();
		}


		
	},
	restartGame: function(){
		game.state.start('dodger')
	},
	addEnemi: function(){
		var randpos = Math.floor(Math.random()* 1400) + 1; 
		var enemi = game.add.sprite(randpos, -50, 'enemi');
		game.physics.arcade.enable(enemi);

		enemi.body.gravity.y = 200;
		this.enemis.add(enemi);
		enemi.checkWorldBounds = true;
		enemi.outOfBoundsKill = true;
	}
};

var game = new Phaser.Game(1400, 1000, Phaser.AUTO, 'gameDiv');

game.state.add('dodger',dodger);
game.state.start('dodger');