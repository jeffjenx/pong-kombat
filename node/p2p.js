var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var p2p = io.of('/pong-kombat');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var rooms = {};
//var clientWaitingRoom = null;
var waitingRoom;
function randomRoom(){
	var name='';
	var length=6;
	var i=0;
	for(;i++<length;){
		var randomNumber=Math.floor(Math.random()*10);
		name+=randomNumber;
	}
	return name;
};

function Paddle(){
	this.type;
	this.x;
	this.y;
	this.s;
	this.w;
	this.h;
	this.vx;
	this.vy;
}
Paddle.prototype.constructor = Paddle;

function Ball(){
	this.type;
	this.resource;
	this.x;
	this.y;
	this.s;
	this.w;
	this.h;
	this.vx;
	this.vy;
	this.r;
	this.sp;
};
Ball.prototype.constructor = Ball;

p2p.on('connection',function(client){
	console.log('Client ('+client.id+') connected.');

	this.disconnect = function(){
		console.log('Client ('+client.id+') disconnected.');
	};

	this.pickPaddle = function(data){
		var paddle = new Paddle();
		paddle.type = data.paddle;

		console.log('Client ('+client.id+') wants paddle '+data.paddle+'.');
		console.log('Client ('+client.id+') wants level '+data.level+'.');

		var room = rooms[data.room];
		room[client.id] = paddle;
		if(!room.level) {
			room.level = data.level;
		} else {
			room.level = (Math.random() < 0.5) ? room.level : data.level;
		}

		if(room[room.host] && room[room.guest]){
			p2p.to(room.id).emit('server:paddlesPicked',room);
		}
	};

	this.selectAnyone = function(data){
		if(waitingRoom){
			var room = rooms[waitingRoom];
			room['guest'] = client.id;
			client.join(waitingRoom);
			console.log('Client ('+client.id+') joined room '+waitingRoom+'.');
			p2p.to(room.id).emit('server:playersJoined',room);
			waitingRoom = null;
		} else {
			var roomId = randomRoom();
			waitingRoom = roomId;
			rooms[roomId] = {
				id: roomId,
				host: client.id
			};
			client.join(roomId);
			console.log('Client ('+client.id+') joined room '+roomId+'.');
		}
	};

	this.setBall = function(data){
		var room = rooms[data.room];
		console.log('Client ('+client.id+') wants ball '+data.type+'.');

		if(!room.ball) {
			room.ball = new Ball();
			room.ball.type = data.type;
			room.ball.resource = data.resource;
		} else {
			if(Math.random() < 0.5){
				room.ball = new Ball();
				room.ball.type = data.type;
				room.ball.resource = data.resource;
			}

			p2p.to(room.id).emit('server:setBall',room);
		}
	};

	client.on('disconnect',this.disconnect);
	client.on('client:pickPaddle',this.pickPaddle);
	client.on('client:selectAnyone',this.selectAnyone);
	client.on('client:setBall',this.setBall);

	/*
	client.pickPaddle = function(data){
		var room = rooms[data.room];
		var player = (client.id === room.host.id) ? room.host : room.guest;

		player.paddle = data.paddle;

		if(room.host.paddle && room.guest.paddle){
			p2p.to(room.name).emit('server:playersReady',room);
		}
	};

	client.playAnyone = function(){
		if(clientWaitingRoom){
			var room = rooms[clientWaitingRoom];
			console.log('Client ('+client.id+') joined client ('+room.host.id+') in room '+room.name+'.');
			client.join(room.name);
			room.guest = new Player(client.id);
			clientWaitingRoom = null;
			p2p.to(room.name).emit('server:roomReady',room);
		} else {
			var roomName = randomRoom();
			console.log('Client ('+client.id+') waiting for match in room '+roomName+'.');
			clientWaitingRoom = roomName;
			rooms[roomName] = {
				name : roomName,
				host : new Player(client.id),
				guest : null,
				ball : null,
				level : null
			};
			client.join(roomName);
		}
	};

	client.pointScored = function(data){
		var room = rooms[data.room];
		room.ball = null;
		client.requestBall(data);
		// p2p.emit('client:requestBall',{
		// 	room:room.name
		// });
	};

	client.setBall = function(data){
		var room = rooms[data.room];
		room.ball = new Ball();
		room.ball.type = data.type;
		room.ball.resource = data.resource;
		p2p.to(room.name).emit('server:setBall',room.ball);
	};

	client.requestBall = function(data){
		var room = rooms[data.room];

		console.log(room.ball);

		if(room.ball){
			p2p.to(room.name).emit('server:ballSelected',room);
		} else {
			var availableBalls = ['BASEBALL','BASKETBALL','BILLIARDS_BALL','COIN','CROQUET_BALL','DEFAULT_BALL','DICE','EMOTICON','EYE_BALL','FOIL_BALL','FOOD','FOOTBALL','LOGO','MARBLE','PAC_MAN','POKEBALL','PONG_BALL','RUPEE','SOCCER_BALL','SOLAR_SYSTEM','STORAGE_MEDIA','SUPER_MARIO','TENNIS_BALL'];
			var availableResources = {
				'BASEBALL' : ['Ball-Baseball','Ball-Baseball-MLB','Ball-Baseball-Old','Ball-Softball'],
				'BASKETBALL' : [ 'Ball-Basketball', 'Ball-Basketball-ABA', 'Ball-Basketball-Old', 'Ball-Basketball-NBA', 'Ball-Kickball' ],
				'BILLIARDS_BALL' : [ 'Ball-Billiards-1', 'Ball-Billiards-2', 'Ball-Billiards-3', 'Ball-Billiards-4', 'Ball-Billiards-5', 'Ball-Billiards-6', 'Ball-Billiards-7', 'Ball-Billiards-8', 'Ball-Billiards-9', 'Ball-Billiards-10', 'Ball-Billiards-11', 'Ball-Billiards-12', 'Ball-Billiards-13', 'Ball-Billiards-14', 'Ball-Billiards-15' ],
				'COIN' : [ 'Ball-Coin-Penny', 'Ball-Coin-Nickle', 'Ball-Coin-Dime', 'Ball-Coin-Quarter' ],
				'CROQUET_BALL' : [ 'Ball-Croquet-Black', 'Ball-Croquet-Blue', 'Ball-Croquet-Red', 'Ball-Croquet-Yellow' ],
				'DEFAUL_BALL' : ['Ball-Default'],
				'DICE' : [
					'Ball-Dice-Red-1', 'Ball-Dice-Red-2', 'Ball-Dice-Red-3', 'Ball-Dice-Red-4', 'Ball-Dice-Red-5', 'Ball-Dice-Red-6',
					'Ball-Dice-White-1', 'Ball-Dice-White-2', 'Ball-Dice-White-3', 'Ball-Dice-White-4', 'Ball-Dice-White-5', 'Ball-Dice-White-6',
					'Ball-Dice-12-Sided', 'Ball-Dice-20-Sided'
				],
				'EMOTICON' : [ 'Ball-Emoticon-Angry', 'Ball-Emoticon-Frowning', 'Ball-Emoticon-Grinning', 'Ball-Emoticon-Shocked', 'Ball-Emoticon-Smiling', 'Ball-Emoticon-Winking' ],
				'EYE_BALL' : [ 'Ball-Eye-Amber', 'Ball-Eye-Blue', 'Ball-Eye-Brown', 'Ball-Eye-Cat', 'Ball-Eye-Green', 'Ball-Eye-Grey', 'Ball-Eye-Hazel', 'Ball-Eye-Red' ],
				'FOIL_BALL' : [ 'Ball-Tin-Foil' ],
				'FOOD' : [
					'Ball-Easter-Egg-Blue', 'Ball-Easter-Egg-Green', 'Ball-Easter-Egg-Purple', 'Ball-Easter-Egg-Red', 'Ball-Easter-Egg-Yellow',
					'Ball-Food-Cookie', 'Ball-Food-Donut', 'Ball-Food-Pizza', 'Ball-Food-Plain-Bagel', 'Ball-Food-Salted-Bagel', 'Ball-Food-Waffle'
				],
				'FOOTBALL' : ['Ball-Football-NFL'],
				'LOGO' : ['Ball-Logo-Android', 'Ball-Logo-Apple', 'Ball-Logo-BMW', 'Ball-Logo-Chrome', 'Ball-Logo-Facebook',
					'Ball-Logo-Facebook', 'Ball-Logo-Firefox', 'Ball-Logo-IE', 'Ball-Logo-Pepsi', 'Ball-Logo-Pinterest', 'Ball-Logo-Safari',
					'Ball-Logo-Starbucks', 'Ball-Logo-Twitter', 'Ball-Logo-Volkswagen', 'Ball-Logo-Wikipedia', 'Ball-Logo-WordPress',
					'Ball-Logo-Obama', 'Ball-Yin-Yang', 'Ball-Yarn', 'Ball-Rubber-Band', 'Ball-Skull', 'Ball-Saw-Blade', 'Ball-Loading', 'Ball-Stop-Sign', 'Ball-Clock', 'Ball-Tron-Disc',
					'Ball-BBS-Wheel'
				],
				'MARBLE' : [ 'Ball-Marble-Brown', 'Ball-Marble-Lavender', 'Ball-Marble-Mint', 'Ball-Marble-Orange', 'Ball-Marble-Pink', 'Ball-Marble-Teal', 'Ball-Bouncy' ],
				'PAC_MAN' : [ 'Ball-Pac-Man', 'Ball-Ms-Pac-Man' ],
				'POKEBALL' : ['Ball-PokeBall'],
				'PONG_BALL' : ['White'],
				'RUPEE' : [ 'Ball-Rupee-Green', 'Ball-Rupee-Blue', 'Ball-Rupee-Yellow', 'Ball-Rupee-Red', 'Ball-Rupee-Purple', 'Ball-Rupee-Orange', 'Ball-Rupee-Silver' ],
				'SOCCER_BALL' : ['Ball-Soccer'],
				'SOLAR_SYSTEM' : [ 'Ball-Asteroid', 'Ball-Sun', 'Ball-Moon', 'Ball-Mercury', 'Ball-Venus', 'Ball-Earth', 'Ball-Mars', 'Ball-Saturn', 'Ball-Neptune', 'Ball-Uranus', 'Ball-Jupiter', 'Ball-Pluto' ],
				'STORAGE_MEDIA' : [ 'Ball-Compact-Disc', 'Ball-Cassette-Tape', 'Ball-Vinyl-Record', 'Ball-Floppy-Disk', 'Ball-Cartridge-Mario', 'Ball-Cartridge-Zelda' ],
				'SUPER_MARIO' : [ 'Ball-Super-Mario-Koopa-Shell', 'Ball-Super-Mario-Mushroom', 'Ball-Super-Mario-1Up', 'Ball-Super-Mario-Coin', 'Ball-Super-Mario-Star-Coin' ],
				'TENNIS_BALL' : [ 'Ball-Table-Tennis-Orange', 'Ball-Table-Tennis-White', 'Ball-Tennis' ]
			};

			room.ball = new Ball();
			room.ball.type = availableBalls[Math.floor(Math.random() * availableBalls.length)];
			room.ball.resource = availableResources[room.ball.type][ Math.floor(Math.random() * availableResources[room.ball.type].length) ];
		}
	};

	client.requestLevel = function(data){
		var room = rooms[data.room];
		var player = (client.id === room.host.id) ? room.host : room.guest;
		player.desiredLevel = data.level;

		if(room.level){
			p2p.to(room.name).emit('server:levelSelected',room);
		} else {
			var availableLevels = ['DEFAULT','FOREST','HELL','HIGHWAY','ICE_RIVER','PIT','PORTAL','STORM','TOWER','TOXIC_POOL','WATERCOLOR'];
			room.level = availableLevels[Math.floor(Math.random() * availableLevels.length)];
		}
	};

	client.updateBall = function(data){
		var room = rooms[data.room];

		room.ball.x = data.x;
		room.ball.y = data.y;
		room.ball.s = data.s;
		room.ball.w = data.w;
		room.ball.h = data.h;
		room.ball.vx = data.vx;
		room.ball.vy = data.vy;

		p2p.to(room.name).emit('server:updateBall',room);
	};

	client.updatePaddle = function(data){
		var room = rooms[data.room];

		var player = (client.id === room.host.id) ? room.host : room.guest;
		player.x = data.x;
		player.y = data.y;
		player.s = data.s;
		player.w = data.w;
		player.h = data.h;
		player.vx = data.vx;
		player.vy = data.vy;

		p2p.to(room.name).emit('server:updatePaddle',player);
	};
	*/
	/*
	client.on('client:pickPaddle',client.pickPaddle);
	client.on('client:playAnyone',client.playAnyone);
	client.on('client:pointScored',client.pointScored);
	client.on('client:requestBall',client.requestBall);
	client.on('client:requestLevel',client.requestLevel);
	client.on('client:updateBall',client.updateBall);
	client.on('client:updatePaddle',client.updatePaddle);
	*/
});

http.listen(3000, function(){
	console.log('Listening on *:3000');
});

/*


var waitingToPlay;
var activeMatches = [];

// Server Messages (I/O)
p2p.on('connection', function(client){
	console.log('Client Connected: ' + client.id);

	client.on('disconnect', function(){
		console.log('Client Disconnected: ' + client.id);
	});

	client.on('client:paddle',function(data){
		console.log('Client ('+client.id+') Selected Paddle:' + data.paddle)
		var match;
		for(var i in activeMatches){
			if(match.room === data.room){
				match = activeMatches[i];
				break;
			}
		}

		if( match){
			if(match.host.id === client.id){
				match.host.paddle = data.paddle;
			} else if(match.guest.id === client.id){
				match.guest.paddle = data.paddle;
			}

			if(match.host.paddle && match.guest.paddle){
				p2p.to(match.room).emit('server:start',match);
			}
		}
	});

	client.on('client:update',function(data){
		var peerData = {
			component:data.component,
			client:client.id,
			x:data.x,
			y:data.y,
			s:data.s,
			w:data.w,
			h:data.h
		};
		p2p.to(data.room).emit('server:update',peerData);
	});

	client.on('client:ready', function(){
		if(waitingToPlay){
			console.log('Client ('+client.id+') Joined: '+waitingToPlay);
			client.join(waitingToPlay);
			var levels = ['DEFAULT','FOREST','HELL','HIGHWAY','ICE_RIVER','PIT','PORTAL','STORM','TOWER','TOXIC_POOL','WATERCOLOR'];
			activeMatches.push({
				room: waitingToPlay,
				host: {
					id: waitingToPlay,
					paddle: null
				},
				guest: {
					id: client.id,
					paddle: null
				},
				ball: 'DEFAULT_BALL', // always start with default ball
				level: levels[Math.floor(Math.random() * levels.length)] // randomize level
			});
			p2p.to(waitingToPlay).emit('server:ready',waitingToPlay);
			waitingToPlay = null;
		} else {
			console.log('Client Waiting: ' + client.id);
			waitingToPlay = client.id;
		}
	});
});

*/
// Game Logic Updates
/*
var frameRate = 1000 / 1; // denominator fps
var then = new Date( ).getTime( );
function gameLoop(){
	var now = new Date( ).getTime( );
	
	if(then + frameRate <= now){
		var deltaTime = (now - then) / 1000;
		then = now;

		for(var i in activeMatches){
			var match = activeMatches[i];

			if(match.host.paddle){
				match.host.paddle.update(deltaTime);
			}
			if(match.guest.paddle){
				match.guest.paddle.update(deltaTime);
			}
			if(match.ball){
				match.ball.update(deltaTime);
			}
		}
	}

	if(Date.now() - then < frameRate - 16) {
		setTimeout(gameLoop, frameRate)
	} else {
		setImmediate(gameLoop)
	}
};
setImmediate(gameLoop);
*/