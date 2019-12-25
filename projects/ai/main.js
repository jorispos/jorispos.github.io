$(document).ready(function(){
		var game = {}
		game.ai = [];
		game.feed = {
			x: Math.floor(Math.random() * backgroundCanvas.width),
			y: Math.floor(Math.random() * backgroundCanvas.height),
			size: 10,
		}

		game.feedh = 0;

		game.size = 5;
		game.speed = 1;
		game.times=30;
		game.interval=5;

		game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");

		init()

		function init(){
			spawn(1000);
		}

		function spawn(num){
			for(i = 0; i < num; i++){
				game.ai.push({
					x: Math.floor(Math.random() * backgroundCanvas.width),
					y: Math.floor(Math.random() * backgroundCanvas.height),
					size: game.size,
					speed: game.speed,
					gender: getRandomInt(1,2),
					dir: 0
				});
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

		function getRandomInt(min, max) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
		}


		function render(){
			for(i in game.ai){
				var ai = game.ai[i];
				var feed = game.feed;
				if(ai.gender == 1){game.contextBackground.fillStyle = "lightblue";}
				if(ai.gender == 2){game.contextBackground.fillStyle = "pink";}

				game.contextBackground.fillRect(ai.x, ai.y, ai.size, ai.size);
				game.contextBackground.fillStyle = "yellow";
				game.contextBackground.fillRect(feed.x, feed.y, feed.size, feed.size);
			}
		}

		function lineDistance( point1, point2 )
		{
  			var xs = 0;
  			var ys = 0;
 
  			xs = point2.x - point1.x;
  			xs = xs * xs;
 
  			ys = point2.y - point1.y;
  			ys = ys * ys;
 
  			return Math.sqrt( xs + ys );
		}

		function loop(){
			for(i in game.ai){
				var ai = game.ai[i];
				var dis = lineDistance(ai,game.feed);
				game.contextBackground.clearRect(ai.x, ai.y, ai.x+ai.size, ai.y+ai.size);
				//if(ai.x>998){ai.x--;} 	if(ai.x<0){ai.x++;}
				
				if(ai.dir==1 && ai.x>0) {ai.x-=ai.speed;} if(ai.dir==2 && ai.x<1000-5) {ai.x+=ai.speed;}
				if(ai.dir==3 && ai.y>0) {ai.y-=ai.speed;} if(ai.dir==4 && ai.y<1000-5) {ai.y+=ai.speed;}

				
				//Move to Feed
				if(dis <= 100){
					ai.speed=0;
				}else{ai.speed=1;}

				if(dis >= 100){
				if(game.interval <= 1){
					ai.dir = getRandomInt(1,6)
				}}else{
					if(ai.x > game.feed.x+game.feed.size) {ai.x--;}
					if(ai.x+ai.size < game.feed.x) {ai.x++;}
					if(ai.y+ai.size < game.feed.y) {ai.y++;}
					if(ai.y > game.feed.y+game.feed.size) {ai.y--;}
				}
			}
			game.interval--;
			if(game.interval <= 0){
				game.interval=getRandomInt(1,3)+2;
			}
		
			for(i in game.feed){
				var feed = game.feed[i]
				if (isCollide(feed, game.ai)){
					game.feedh++;
				}
				if (game.feedh>=600){
					game.feedh = 0;
					game.feed.x = Math.floor(Math.random() * backgroundCanvas.width);
					game.feed.y = Math.floor(Math.random() * backgroundCanvas.height);
				}
			}
		}

		setInterval(function(){
			loop();
			render();
		}, 1000/30);
});