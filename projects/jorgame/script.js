var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

//Setup Variables
var player = {
	size: 48,
	x: canvas.width/2-24,
	y: canvas.height/2-24,
	moveSpeed: 8
};

var playerStartX = canvas.width/2-player.size/2;
var playerStartY = canvas.height/2-player.size/2;

var leftKey = false;
var rightKey = false;
var upKey = false;
var downKey = false;

var enemies = [];
var spawnRate = 30;
var score = 0;

//Gather high score
if(localStorage.getItem('thehighscore')) {
	var highScore = localStorage.getItem('thehighscore');
} else {var highScore = 0;}

function dead() {
	enemies = [];
	player.x = playerStartX;
	player.y = playerStartY;
	leftKey = false;
	rightKey = false;
	upKey = false;
	downKey = false;
	spawnRate = 30;

	//Handle Score
	if(score > highScore) {
		highScore = score;
		localStorage.setItem('thehighscore', highScore);
		score = 0;
	}else {
		score = 0;
	}
}

//Event Listeners
document.addEventListener("keydown", function(key) {
	if(key.keyCode === 37) {
		leftKey = true;
	}else if(key.keyCode === 39) {
		rightKey = true;
	}else if(key.keyCode === 38) {
		upKey = true;
	}else if(key.keyCode === 40) {
		downKey = true;
	} 
});

document.addEventListener("keyup", function(key) {
	if(key.keyCode === 37) {
		leftKey = false;
	}else if(key.keyCode === 39) {
		rightKey = false;
	}else if(key.keyCode === 38) {
		upKey = false;
	}else if(key.keyCode === 40) {
		downKey = false;
	} 
});

//Loop Functions
setInterval(function() {
	update();
	render();
}, 1000/60);

setInterval(function() {
	score++;
	if(score % 5 === 0 && spawnRate > 2) {
		spawnRate--;
	}
}, 1000);

function update() {
	playerMovement();
	enemyMovement();
	enemySpawn();
}

function playerMovement() {
	if(leftKey) {
		if(player.x > 0) {
			player.x -= player.moveSpeed;
		}
	}
	if(rightKey) {
		if(player.x < canvas.width - player.size) {
			player.x += player.moveSpeed;
		}
	}
	if(upKey) {
		if(player.y > 0) {
			player.y -= player.moveSpeed;
		}
	}
	if(downKey) {
		if(player.y < canvas.height - player.size) {
			player.y += player.moveSpeed;
		}
	}
}

function enemySpawn() {
	var rand = Math.floor(Math.random() * spawnRate);
	if(rand === 1) {
		spawnEnemies(1);
	}
}

function enemyMovement() {
	for(let i = 0; i < enemies.length; i++) {
		switch(enemies[i].direction) {
			case 0:
				enemies[i].x += enemies[i].moveSpeed;
				break;
			case 180:
				enemies[i].x -= enemies[i].moveSpeed;
				break;
			case 90:
				enemies[i].y += enemies[i].moveSpeed;
				break;
			case 270:
				enemies[i].y -= enemies[i].moveSpeed;
				break;
		}

		if( enemies[i].x < -enemies[i].size 				||
		   	enemies[i].x > canvas.width + enemies[i].size	||
		   	enemies[i].y < -enemies[i].size					||
		   	enemies[i].y > canvas.height + enemies[i].size) {

			enemies.splice(i, 1);
		}

		if(isCollide(enemies[i], player)) {
			dead();
		}
	}
}

function render() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = "lightblue";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = "red";
	ctx.fillRect(player.x, player.y, player.size, player.size);

	//Render all enemies
	for(let i = 0; i < enemies.length; i++) {
		ctx.fillStyle = enemies[i].color;
		ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size);
	}

	ctx.fillStyle = "#FFA2A2";
	ctx.font = "30px Bitter";
	ctx.fillText("High Score: " + highScore, 20, 40);
	ctx.fillText("Score: " + score, 20, 80);
}

//Functions
function spawnEnemies(nums) {
	for(let i = 0; i < nums; i++) {
		//Setup starting object
		let enemy = {
			x: 0,
			y: 0,
			size: 20,
			direction: 0,
			moveSpeed: 4,
			color: "#FFA2A2"
		};

		//Set positions
		var rand = Math.floor(Math.random() * 4);
		switch(rand) {
			//Left
			case 0:
				enemy.x = -enemy.size;
				enemy.y = Math.floor(Math.random() * canvas.height - enemy.size);
				enemy.direction = 0;
				break;
			//Right
			case 1:
				enemy.x = canvas.width + enemy.size;
				enemy.y = Math.floor(Math.random() * canvas.height - enemy.size);
				enemy.direction = 180;
				break;
			//Up
			case 2:
				enemy.x = Math.floor(Math.random() * canvas.width - enemy.size);
				enemy.y = -enemy.size;
				enemy.direction = 90;
				break;
			//Down
			case 3:
				enemy.x = Math.floor(Math.random() * canvas.width - enemy.size);
				enemy.y = canvas.height + enemy.size;
				enemy.direction = 270;
				break;
		}
		enemies.push(enemy);
	}
}

function isCollide(a, b) {
    return !(
        ((a.y + a.size) < (b.y)) ||
        (a.y > (b.y + b.size)) ||
        ((a.x + a.size) < b.x) ||
        (a.x > (b.x + b.size))
    );
}