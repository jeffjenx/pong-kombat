var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var p2p = io.of('/pong-kombat');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


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
			match = activeMatches[i];
			if(match.room === data.room){
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

	/*
	client.on('client:input',function(data){
		var match;
		for(var i in activeMatches){
			match = activeMatches[i];
			if(match.room === data.room){
				break;
			}
		}

		if(match){
			if(match.host.id === client.id){
				match.host.paddle[data.action]();
			} else if(match.guest.id === client.id) {
				match.guest.paddle[data.action]();
			}
		}
	});
	*/

	client.on('client:ready', function(){
		if(waitingToPlay){
			console.log('Client ('+client.id+') Joined: '+waitingToPlay);
			client.join(waitingToPlay);
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
				ball: null
			});
			p2p.to(waitingToPlay).emit('server:ready',waitingToPlay);
			waitingToPlay = null;
		} else {
			console.log('Client Waiting: ' + client.id);
			waitingToPlay = client.id;
		}
	});
});

http.listen(3000, function(){
	console.log('Listening on *:3000');
});

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