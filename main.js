var dodger = {



	preload: function() {
		// Charger les fichiers
		game.load.image('fond', 'assets/fond.jpg');
		game.load.image('player', 'assets/electru.jpg')
		game.load.image('enemi', 'assets/forbiden.png')
		game.load.image('gameover', 'assets/gameover.jpg')
		this.load.audio('bestdeck', 'assets/bestdeck.ogg');
		this.load.audio('musicjeu', 'assets/musicjeu.mp3');
	},

	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.sound.mute = false;
		game.add.sprite(0, 0, 'fond');
		this.player =  game.add.sprite(600, 800, 'player');

		game.physics.arcade.enable(this.player);

		this.cursors = game.input.keyboard.createCursorKeys();

		this.enemis = game.add.group();

		this.timer = game.time.events.loop(200, this.addEnemi, this);

		this.score = 0;
		this.bestScore = 0;
		this.labelScore = game.add.text(20, 20, "score: 0", {font: "30px Arial", fill: "#ffff"} );
		

		const width = this.scale.width;
		const height = this.scale.height;
	
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
		var music = this.sound.add('musicjeu');
		
		music.play();
	
	},

	update: function() {
		game.physics.arcade.overlap(this.player, this.enemis, this.gameOver, null, this);
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
			this.gameOver();
			

		

			 
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

		this.score += 1;
		this.labelScore.text = "score:" + this.score;
		

		enemi.checkWorldBounds = true;
		enemi.outOfBoundsKill = true;
	},

	gameOver: function(){
		
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.add.sprite(0, 0, 'gameover');
		game.cache.removeSound('musicjeu');
		this.sound.play('bestdeck');
		this.labelRestart = game.add.text(800, 900, "Appuyez sur 'Espace' pour rejouer", {font: "30px Arial", fill: "#ffff"} );
		this.labelScore = game.add.text(20, 20, "score: 0", {font: "30px Arial", fill: "#ffff"} );
		this.labelScore.text = "score:" + this.score;
		if(this.spaceKey.isDown){
			
			this.restartGame();
		}
	},

	destroy: function(){
		enemis.destroy();
	}

};

var game = new Phaser.Game(1400, 1000, Phaser.AUTO, 'gameDiv');

game.state.add('dodger',dodger);
game.state.start('dodger');