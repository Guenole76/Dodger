var dodger = {



	preload: function() {
		// Charger les fichiers
		game.load.image('fond', 'assets/fond.jpg');
		game.load.image('player', 'assets/electru.jpg')
		game.load.image('enemi', 'assets/forbiden.png')
		game.load.image('gameover', 'assets/gameover.jpg')
		this.load.audio('deck', 'assets/bestdeck.ogg');
		this.load.audio('musicjeu', 'assets/musicjeu.mp3');
	},

	create: function() {
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.sound.mute = false;
		game.add.sprite(0, 0, 'fond');
		this.player =  game.add.sprite(600, 800, 'player');//ajoute l'image 'player' a la coordonner donnée

		game.physics.arcade.enable(this.player);//l'image 'player' est affecter par la psysics

		this.cursors = game.input.keyboard.createCursorKeys();

		this.enemis = game.add.group();//ajoute un groupe d'enemis

		this.timer = game.time.events.loop(200, this.addEnemi, this);// ajoute un enemi a chaque intervale de temps

		this.score = 0;
		this.bestScore = 0;
		this.labelScore = game.add.text(20, 20, "score: 0", {font: "30px Arial", fill: "#ffff"} );
		

		const width = this.scale.width;
		const height = this.scale.height;
	
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		play = true;
		
		if (play === true){
		var music = this.sound.add('musicjeu');
		music.play();//joue la musique 'musicjeu'
		}

		
		x = true;
		

	
	},

	update: function() {
		game.physics.arcade.overlap(this.player, this.enemis, this.gameOver, null, this);// si l'image player touche une image 'enemis' on lance la function gameOver
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		if(this.cursors.left.isDown){//si la fleche gauche est enfoncer l'image player se deplace de -600px sur l'axe des x
			this.player.body.velocity.x = -600;
		}
		if(this.cursors.right.isDown){//si la fleche droite est enfoncer l'image player se deplace de 600px sur l'axe des x
			this.player.body.velocity.x = 600;
		}
		if(this.cursors.up.isDown){//si la fleche du bas est enfoncer l'image player se deplace de -600px sur l'axe des y
			this.player.body.velocity.y = -600;
		}
		if(this.cursors.down.isDown){//si la fleche du haut est enfoncer l'image player se deplace de 600px sur l'axe des y
			this.player.body.velocity.y = 600;
		}
		if(this.player.inWorld == false){//si l'image du joueur est hors du "plateau" on lance la function gameOver

			this.gameOver();
			

		

			 
		}

		
	},
	restartGame: function(){
		game.state.start('dodger')
	},
	addEnemi: function(){
		if(x === true){
			var randpos = Math.floor(Math.random()* 1400) + 1; 
			var enemi = game.add.sprite(randpos, -50, 'enemi');
			game.physics.arcade.enable(enemi);

			enemi.body.gravity.y = 200;
			this.enemis.add(enemi);

			this.score += 1;
			this.labelScore.text = "score:" + this.score;
			

			enemi.checkWorldBounds = true;
			enemi.outOfBoundsKill = true;
		}

	},

	gameOver: function(){
		x = false;
		play = false;
		if(x === false){
			this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			game.add.sprite(0, 0, 'gameover');
			game.cache.removeSound('musicjeu');
			

			
			this.labelRestart = game.add.text(800, 900, "Appuyez sur 'Espace' pour rejouer", {font: "30px Arial", fill: "#ffff"} );
			this.labelScore = game.add.text(20, 20, "score: 0", {font: "30px Arial", fill: "#ffff"} );
			this.labelScore.text = "score:" + this.score;
			
			
			if(this.spaceKey.isDown){
				
				this.restartGame();
			}
		}
	}


};

var game = new Phaser.Game(1400, 1000, Phaser.AUTO, 'gameDiv');

game.state.add('dodger',dodger);
game.state.start('dodger');