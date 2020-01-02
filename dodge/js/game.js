// create new scene
let gameScene = new Phaser.Scene('Game');

// setup the game configuration
let config = {
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
	width: 800,
	height: 608,
	scene: gameScene,
	parent: 'gameDiv',
};

// create new game using the configuration
let game = new Phaser.Game(config);

gameScene.spawnEnemy = function(enemy) {
	enemy.setBounce(1,1);
	enemy.setVelocity(Math.random() > 0.5 ? 
		//Positive
		(Math.random()*50 + 50, Math.random()*50 + 50)
		:
		//Negative
		(-(Math.random()*50 + 50), -(Math.random()*50 + 50))
	);
	let random = Math.random()
	if(random < 0.25) {
		//Left
		enemy.x = 48;
		enemy.y = Math.random() * 544 + 16;
	}else if(random < 0.5) {
		//Right
		enemy.x = 752;
		enemy.y = Math.random() * 544 + 16;
	}else if(random < 0.75) {
		//Up
		enemy.x = Math.random() * 736 + 16;
		enemy.y = 48;
	}else {
		//Down
		enemy.x = Math.random() * 736 + 16;
		enemy.y = 560;
	}
}

// initialize all variables
gameScene.init = function() {
	this.tick = 0;
	this.spawnTime = 180;
	this.terminate = false;
	this.time = 0;
	this.highscore = localStorage.getItem("highscore") == null ? 0 : localStorage.getItem("highscore");
};

// load all assets
gameScene.preload = function() {
	//Load sprites
	this.load.image('player', 'assets/player.png');
	this.load.image('wall', 'assets/wall.png');
	this.load.image('enemy', 'assets/enemy.png');

	//Load audio
	this.load.audio('music', 'assets/music.mp3');
	this.load.audio('lose', 'assets/lose.wav');
};

// create everything
gameScene.create = function() {
	//Initialize sprites
	this.player = this.physics.add.image(400, 300, 'player');

	//Handle Audio
	this.music = this.sound.add('music');
	this.loseSound = this.sound.add('lose');
	this.music.play();

	//Create walls
	this.walls = this.physics.add.group({
		key: 'wall',
		frameQuantity: 84,
		immovable: true,
	});
	Phaser.Actions.PlaceOnRectangle(this.walls.getChildren(), new Phaser.Geom.Rectangle(16, 16, 800-32, 608-32));

	//Create enemies
	this.enemies = this.physics.add.group({
		key: 'enemy',
		frameQuantity: 8,
	});
	Phaser.Actions.PlaceOnRectangle(this.enemies.getChildren(), new Phaser.Geom.Rectangle(64, 64, 800-128, 608-128));
	Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
		this.spawnEnemy(enemy);
	}, this);

	//Setup the input listeners
	this.cursors = this.input.keyboard.createCursorKeys();

	//Setup text
	this.scoreText = this.add.text(40, 70, `Score: ${this.time/60}`, {
        font: "25px Arial",
        fill: "#ffffff",
    });
    this.scoreText.depth = 1;
    this.topScoreText = this.add.text(40, 40, `High Score: ${Math.round(this.highscore/60)}`, {
        font: "25px Arial",
        fill: "#ffffff",
    });
    this.topScoreText.depth = 1;
};

// the game loop
gameScene.update = function() {
	//Check if game is on
	if(this.terminate) return;

	//Player
	let playerRect = this.player.getBounds();
	this.physics.world.collide(this.player, this.walls);
	//Player movement
	this.player.setVelocity(0);
	if(this.cursors.left.isDown) {
		this.player.setVelocityX(-200);
	}
	if(this.cursors.right.isDown) {
		this.player.setVelocityX(200);
	}
	if(this.cursors.up.isDown) {
		this.player.setVelocityY(-200);
	}
	if(this.cursors.down.isDown) {
		this.player.setVelocityY(200);
	}

	//Enemy
	//Enemy collisions
	this.physics.world.collide(this.enemies, this.walls);
	this.physics.world.collide(this.enemies, this.enemies);
	//Enemy loop
	let enemies = this.enemies.getChildren();
	for(let i = 0; i < enemies.length; i++) {
		let enemyRect = enemies[i].getBounds();

		if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
			this.gameOver();
			return;
		}
	}

	//Handle spawntime and survivetime
	this.tick++;
	if(this.tick > this.spawnTime) {
		this.tick = 0;
		let enemy = this.enemies.create(-100, -100, 'enemy');
		this.spawnEnemy(enemy);
	}
	this.time++;
	this.scoreText.setText(`Score: ${Math.round(this.time/60)}`);
};

gameScene.gameOver = function() {
	Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
		enemy.setVelocity(0);
	}, this);
	this.player.setVelocity(0);
	this.music.stop();
	this.loseSound.play();

	if(this.time > this.highscore) {
		localStorage.setItem("highscore", this.time);
	}

	// initiatd game over sequence
	this.terminate = true;

	// shake camera
	this.cameras.main.shake(500);

	//listen for event completion
	this.cameras.main.on('camerashakecomplete', function(camera, effect) {
		//fade out
		this.cameras.main.fade(500);
	}, this);

	this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
		this.scene.restart();
	}, this);	
};