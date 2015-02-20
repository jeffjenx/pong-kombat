function KombatScene( ) {
	Scene.call( this );
	
	this.addLayer( 'Background', new BackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'Foreground', new ForegroundLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.startLife = 5;
	this.states = {
		announcing : 0,
		secretMessage : 1,
		starting : 2,
		fighting : 3,
		finishing : 4,
		dismantling : 5,
		ending : 6,
		paused : 7
	};

	this.state = null;
	
	this.finishTypes = {
		dismantled : 0,
		level : 1,
		spamality : 2
	}
	this.finishType = null;
	this.winner = null;
	this.currentRound = 1;

	this.setLevel( Levels.RANDOM );

	var spamify = function() {
		var randomSpam = Math.ceil( Math.random() * 9 );
		var spam = new Sprite( 'Spam-' + randomSpam );
		spam.position.x = Math.random() * viewport.width;
		spam.position.y = Math.random() * viewport.height;
		SceneManager.currentScene.layers['Foreground'].addComponent( 'Spam-' + Date.now(), spam );
	};
	this.spamalityAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action : spamify },
		{ start : 2.0, end : 2.0, action : spamify },
		{ start : 3.0, end : 3.0, action : spamify },
		{ start : 4.0, end : 4.0, action : spamify },
		{ start : 5.0, end : 5.0, action : spamify },
		{ start : 6.0, end : 6.0, action : spamify },
		{ start : 7.0, end : 7.0, action : spamify },
		{ start : 8.0, end : 8.0, action : spamify },
		{ start : 9.0, end : 9.0, action : spamify },
		{ start : 10.0, end : 10.0, action : spamify },
		{ start : 11.0, end : 11.0, action : spamify },
		{ start : 1.5, end : 1.5, action : spamify },
		{ start : 2.5, end : 2.5, action : spamify },
		{ start : 3.5, end : 3.5, action : spamify },
		{ start : 4.5, end : 4.5, action : spamify },
		{ start : 5.5, end : 5.5, action : spamify },
		{ start : 6.5, end : 6.5, action : spamify },
		{ start : 7.5, end : 7.5, action : spamify },
		{ start : 8.5, end : 8.5, action : spamify },
		{ start : 9.5, end : 9.5, action : spamify },
		{ start : 10.5, end : 10.5, action : spamify },
		{ start : 12.5, end : 12.5, action : function() {
			SceneManager.currentScene.layers['Foreground'].addComponent( 'Spam-' + Date.now(), new Sprite( 'Spam-0' ) );
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];

	if( app.settings.SOUND_FX > 0 ) {
		this.dismantleSound = new Sound( 'Dun-Dun-Dun' );
		this.dismantleSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
	}

	if( app.settings.TUNES > 0 ) {
		this.music = new Sound( 'Music-Retro-Crime-Movie' );
		this.music.setMaxVolume( 0.11 * app.settings.TUNES / 11 );
		this.music.loop( );
	}
}

KombatScene.prototype = new Scene;
KombatScene.prototype.constructor = KombatScene;

KombatScene.prototype.updateOut = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( 1 - transitionPercent );
	}

	for( var i in this.layers) {
		if( this.layers[i].updateOut ) {
			this.layers[i].updateOut( transitionPercent );
		}
	}
};

KombatScene.prototype.updateIn = function( transitionPercent ) {
	if( app.settings.TUNES > 0 ) {
		this.music.setVolume( transitionPercent );
	}


	for( var i in this.layers) {
		if( this.layers[i].updateIn ) {
			this.layers[i].updateOut( transitionPercent );
		}
	}
};

KombatScene.prototype.unload = function( ) {
	if( app.settings.TUNES > 0 ) {
		this.music.stop( );
	}

	for( var i in this.layers) {
		if( this.layers[i].unload ) {
			this.layers[i].unload( );
		}
	}
};

KombatScene.prototype.addKombatant = function( kombatant ) {
	kombatant.life = this.startLife;
	this.layers['Kombat'].addKombatant( kombatant );
};

KombatScene.prototype.changeState = function( state ) {
	this.state = state;
	this.stateTime = 0;
	this.layers['HUD'].resetSounds();

	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];

	switch( state ) {
		case this.states.announcing :
			if( app.settings.TUNES > 0 ) {
				this.music.stop();
			}
		// no break;

		case this.states.starting :
		case this.states.finishing :
			if( leftKombatant ) {
				leftKombatant.paddle.velocity.x = 0;
				leftKombatant.paddle.velocity.y = 0;
			}
			if( rightKombatant ) {
				rightKombatant.paddle.velocity.x = 0;
				rightKombatant.paddle.velocity.y = 0;
			}
		break;

		case this.states.dismantling :
			if( app.settings.SOUND_FX > 0 ) {
				this.dismantleSound.play();	
			}
		break;
	}
};

KombatScene.prototype.levelDismantle = function( winner, loser ) {
	var level = this.layers['Foreground'];

	if( !level.dismantleAnimationFrames ) {
		return;
	}

	var sceneTime = loser.layer.scene.stateTime;

	for( var i = 0; i < level.dismantleAnimationFrames.length; i++ ) {
		var frame = level.dismantleAnimationFrames[i];
		if( sceneTime >= frame.start ) {
			if( frame.start === frame.end ) {
				// called once
				frame.action( winner.paddle, loser.paddle );
				level.dismantleAnimationFrames.splice(i, 1);
				--i;
			}
			else if( frame.end < 0 || sceneTime <= frame.end ) {
				// called continuously
				var percentComplete = ( frame.end > frame.start ) ? (sceneTime - frame.start) / (frame.end - frame.start) : 0;
				frame['action']( winner.paddle, loser.paddle, percentComplete );
			}
		}
	}
};

KombatScene.prototype.spamality = function( winner, loser ) {
	var sceneTime = loser.layer.scene.stateTime;

	for( var i = 0; i < this.spamalityAnimationFrames.length; i++ ) {
		var frame = this.spamalityAnimationFrames[i];
		if( sceneTime >= frame.start ) {
			if( frame.start === frame.end ) {
				// called once
				frame.action( winner.paddle, loser.paddle );
				this.spamalityAnimationFrames.splice(i, 1);
				--i;
			}
			else if( frame.end < 0 || sceneTime <= frame.end ) {
				// called continuously
				var percentComplete = ( frame.end > frame.start ) ? (sceneTime - frame.start) / (frame.end - frame.start) : 0;
				frame['action']( winner.paddle, loser.paddle, percentComplete );
			}
		}
	}
};

KombatScene.prototype.setBall = function( ballType, ballResource ) {
	if(app.gameMode !== GameModes.P2P){
		this.layers['Kombat'].setBall( Balls[ballType], ballResource );
	} else {
		if(!ballType || ballType === 'RANDOM'){
			var keys = Object.keys(Balls);
			do{
				ballType = keys[ keys.length * Math.random() << 0];
			} while (ballType === 'RANDOM');
		}
		if(!ballResource || ballResource === 'RANDOM'){
			var resources = [];
			switch(ballType){
				case 'BASEBALL':
					resources = ['Ball-Baseball','Ball-Baseball-MLB','Ball-Baseball-Old','Ball-Softball'];
				break;
				case 'BASKETBALL':
					resources = ['Ball-Basketball','Ball-Basketball-ABA','Ball-Basketball-Old','Ball-Basketball-NBA','Ball-Kickball'];
				break;
				case 'BILLIARDS':
					resources = ['Ball-Billiards-1','Ball-Billiards-2','Ball-Billiards-3','Ball-Billiards-4','Ball-Billiards-5','Ball-Billiards-6','Ball-Billiards-7','Ball-Billiards-8','Ball-Billiards-9','Ball-Billiards-10','Ball-Billiards-11','Ball-Billiards-12','Ball-Billiards-13','Ball-Billiards-14','Ball-Billiards-15'];
				break;
				case 'COIN':
					resources = ['Ball-Coin-Penny','Ball-Coin-Nickle','Ball-Coin-Dime','Ball-Coin-Quarter'];
				break;
				case 'CROQUET_BALL':
					resources = ['Ball-Croquet-Black','Ball-Croquet-Blue','Ball-Croquet-Red','Ball-Croquet-Yellow'];
				break;
				case 'DICE':
					resources = [
						'Ball-Dice-Red-1', 'Ball-Dice-Red-2', 'Ball-Dice-Red-3', 'Ball-Dice-Red-4', 'Ball-Dice-Red-5', 'Ball-Dice-Red-6',
						'Ball-Dice-White-1', 'Ball-Dice-White-2', 'Ball-Dice-White-3', 'Ball-Dice-White-4', 'Ball-Dice-White-5', 'Ball-Dice-White-6',
						'Ball-Dice-12-Sided', 'Ball-Dice-20-Sided'
					];
				break;
				case 'EMOTICON':
					resources = [ 'Ball-Emoticon-Angry', 'Ball-Emoticon-Frowning', 'Ball-Emoticon-Grinning', 'Ball-Emoticon-Shocked', 'Ball-Emoticon-Smiling', 'Ball-Emoticon-Winking' ];
				break;
				case 'EYE_BALL':
					resources = [ 'Ball-Eye-Amber', 'Ball-Eye-Blue', 'Ball-Eye-Brown', 'Ball-Eye-Cat', 'Ball-Eye-Green', 'Ball-Eye-Grey', 'Ball-Eye-Hazel', 'Ball-Eye-Red' ];
				break;
				case 'FOIL_BALL':
					resources = [ 'Ball-Tin-Foil' ];
				break;
				case 'FOOD':
					resources = [
						'Ball-Easter-Egg-Blue', 'Ball-Easter-Egg-Green', 'Ball-Easter-Egg-Purple', 'Ball-Easter-Egg-Red', 'Ball-Easter-Egg-Yellow',
						'Ball-Food-Cookie', 'Ball-Food-Donut', 'Ball-Food-Pizza', 'Ball-Food-Plain-Bagel', 'Ball-Food-Salted-Bagel', 'Ball-Food-Waffle'
					];
				break;
				case 'FOOTBALL':
					resources = ['Ball-Football-NFL'];
				break;
				case 'LOGO':
					resources = [ 'Ball-Logo-Android', 'Ball-Logo-Apple', 'Ball-Logo-BMW', 'Ball-Logo-Chrome', 'Ball-Logo-Facebook',
					'Ball-Logo-Facebook', 'Ball-Logo-Firefox', 'Ball-Logo-IE', 'Ball-Logo-Pepsi', 'Ball-Logo-Pinterest', 'Ball-Logo-Safari',
					'Ball-Logo-Starbucks', 'Ball-Logo-Twitter', 'Ball-Logo-Volkswagen', 'Ball-Logo-Wikipedia', 'Ball-Logo-WordPress',
					'Ball-Logo-Obama', 'Ball-Yin-Yang', 'Ball-Yarn', 'Ball-Rubber-Band', 'Ball-Skull', 'Ball-Saw-Blade', 'Ball-Loading', 'Ball-Stop-Sign', 'Ball-Clock', 'Ball-Tron-Disc',
					'Ball-BBS-Wheel' ];
				break;
				case 'MARBLE':
					resources = [ 'Ball-Marble-Brown', 'Ball-Marble-Lavender', 'Ball-Marble-Mint', 'Ball-Marble-Orange', 'Ball-Marble-Pink', 'Ball-Marble-Teal', 'Ball-Bouncy' ];
				break;
				case 'PAC_MAN':
					resources = [ 'Ball-Pac-Man', 'Ball-Ms-Pac-Man' ];
				break;
				case 'POKEBALL':
					resources = ['Ball-PokeBall'];
				break;
				case 'PONG_BALL':
					resources = ['White'];
				break;
				case 'RUPEE':
					resources = [ 'Ball-Rupee-Green', 'Ball-Rupee-Blue', 'Ball-Rupee-Yellow', 'Ball-Rupee-Red', 'Ball-Rupee-Purple', 'Ball-Rupee-Orange', 'Ball-Rupee-Silver' ];
				break;
				case 'SOCCER_BALL':
					resources = ['Ball-Soccer'];
				break;
				case 'SOLAR_SYSTEM':
					resources = [ 'Ball-Asteroid', 'Ball-Sun', 'Ball-Moon', 'Ball-Mercury', 'Ball-Venus', 'Ball-Earth', 'Ball-Mars', 'Ball-Saturn', 'Ball-Neptune', 'Ball-Uranus', 'Ball-Jupiter', 'Ball-Pluto' ];
				break;
				case 'STORAGE_MEDIA':
					resources = [ 'Ball-Compact-Disc', 'Ball-Cassette-Tape', 'Ball-Vinyl-Record', 'Ball-Floppy-Disk', 'Ball-Cartridge-Mario', 'Ball-Cartridge-Zelda' ];
				break;
				case 'SUPER_MARIO':
					resources = [ 'Ball-Super-Mario-Koopa-Shell', 'Ball-Super-Mario-Mushroom', 'Ball-Super-Mario-1Up', 'Ball-Super-Mario-Coin', 'Ball-Super-Mario-Star-Coin' ];
				break;
				case 'TENNIS_BALL':
					resources = [ 'Ball-Table-Tennis-Orange', 'Ball-Table-Tennis-White', 'Ball-Tennis' ];
				break;
				default:
					resources = ['Ball-Default'];
			}
			ballResource = resources[ resources.length * Math.random() << 0 ];
		}
		p2p.emit('client:setBall',{
			room:p2p.currentRoom,
			type: ballType,
			resource: ballResource
		});
		var kombatLayer = this.layers['Kombat'];
		p2p.on('server:setBall',function(room){
			kombatLayer.setBall(Balls[room.ball.type], room.ball.resource);

			var ball = kombatLayer.components['Ball'];
			
			if(p2p.id === room.host){
				// Host keeps track of ball position
				var ballUpdate = ball.update;
				ball.update = function(deltaTime) {
					ballUpdate.call(ball, deltaTime);
					p2p.emit('client:updateBall',{
						room:p2p.currentRoom,
						x:ball.position.x,
						y:ball.position.y,
						w:ball.size.x,
						h:ball.size.y,
						s:ball.scale,
						r:ball.rotation,
						vx:ball.velocity.x,
						vy:ball.velocity.y,
						sp:ball.speed
					});
				};
			} else {
				// Guest mirrors host's ball position
				p2p.on('server:updateBall',function(room){
					ball.position.x = viewport.width - room.ball.x;
					ball.position.y = room.ball.y;
					ball.size.x = room.ball.w;
					ball.size.y = room.ball.h;
					ball.velocity.x = room.ball.vx;
					ball.velocity.y = room.ball.vy;
					ball.scale = room.ball.s;
					ball.rotation = room.ball.r;
					ball.speed = room.ball.sp;
				});
			}
		});
	}
};

KombatScene.prototype.setLevel = function( level ) {
	switch( level ) {
		case Levels.RANDOM :
			var count = 0;
			for( var i in Levels) {
				if( Levels.hasOwnProperty(i) && i !== "RANDOM" ) {
					++count;
				}
			}
			this.setLevel( Math.ceil( Math.random( ) * count ) );
		break;
		
		case Levels.FOREST :
			this.layers['Background'] = new ForestBackgroundLayer( this );
			this.layers['Foreground'] = new ForestForegroundLayer( this );
		break;
		
		case Levels.HELL :
			this.layers['Background'] = new HellBackgroundLayer( this );
			this.layers['Foreground'] = new HellForegroundLayer( this );
		break;
		
		case Levels.HIGHWAY :
			this.layers['Background'] = new HighwayBackgroundLayer( this );
			this.layers['Foreground'] = new HighwayForegroundLayer( this );
		break;
		
		case Levels.ICE_RIVER :
			this.layers['Background'] = new IceRiverBackgroundLayer( this );
			this.layers['Foreground'] = new IceRiverForegroundLayer( this );
		break;
		
		case Levels.PIT :
			this.layers['Background'] = new PitBackgroundLayer( this );
			this.layers['Foreground'] = new PitForegroundLayer( this );
		break;
		
		case Levels.PORTAL :
			this.layers['Background'] = new PortalBackgroundLayer( this );
			this.layers['Foreground'] = new PortalForegroundLayer( this );
		break;
		
		case Levels.STORM :
			this.layers['Background'] = new StormBackgroundLayer( this );
			this.layers['Foreground'] = new StormForegroundLayer( this );
		break;
		
		case Levels.TOWER :
			this.layers['Background'] = new TowerBackgroundLayer( this );
			this.layers['Foreground'] = new TowerForegroundLayer( this );
		break;
		
		case Levels.TOXIC_POOL :
			this.layers['Background'] = new ToxicPoolBackgroundLayer( this );
			this.layers['Foreground'] = new ToxicPoolForegroundLayer( this );
		break;
		
		case Levels.WATERCOLOR :
			this.layers['Background'] = new WatercolorBackgroundLayer( this );
			this.layers['Foreground'] = new WatercolorForegroundLayer( this );
		break;
		
		default :
			this.layers['Background'] = new DefaultBackgroundLayer( this );
			this.layers['Foreground'] = new DefaultForegroundLayer( this );
		break;
	}
};

KombatScene.prototype.startMatch = function( ) {
	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];
	this.winner = null;
	this.finishType = null;

	if( Math.random() < 0.05 && leftKombatant.paddle.enum !== 'MRSLAYER' && rightKombatant.paddle.enum !== 'MRSLAYER' ) {
		this.changeState( this.states.secretMessage );
		this.layers['HUD'].addSecretMessage();
	} else {
		this.changeState( this.states.starting );
	}
	
	if( leftKombatant )
	{
		leftKombatant.roundsWon = 0;
		leftKombatant.flawlessRounds = 0;
		leftKombatant.life = this.startLife;
		leftKombatant.paddle.opacity = 1;
		leftKombatant.paddle.scale = 1;
	}

	if( rightKombatant )
	{
		rightKombatant.roundsWon = 0;
		rightKombatant.flawlessRounds = 0;
		rightKombatant.life = this.startLife;
		rightKombatant.paddle.opacity = 1;
		rightKombatant.paddle.scale = 1;
	}
};

KombatScene.prototype.nextRound = function() {
	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];
	
	this.changeState( this.states.starting );
	
	if( leftKombatant )
	{
		leftKombatant.life = this.startLife;
		leftKombatant.paddle.opacity = 1;
		leftKombatant.paddle.scale = 1;
	}

	if( rightKombatant )
	{
		rightKombatant.life = this.startLife;
		rightKombatant.paddle.opacity = 1;
		rightKombatant.paddle.scale = 1;
	}
};

KombatScene.prototype.update = function( deltaTime ) {
	if( this.state === null ) {
		this.startMatch( );
		return;
	}

	if( this.state === this.states.paused ) {
		if( !this.layers['Menu'] ) {
			this.addLayer( 'Menu', new PauseMenu( this ) );
		}
		
		this.layers['Menu'].update( deltaTime );
		return;
	}
	
	Scene.prototype.update.call( this, deltaTime );
	
	this.stateTime += deltaTime;
	
	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];
	
	switch( this.state ) {
		case this.states.announcing :
			if( this.stateTime >= 3 ) {
				this.changeState( this.states.finishing );
			}
			this.layers['Kombat'].centerPaddles();
		break;

		case this.states.secretMessage :
			if( this.stateTime >= 6 ) {
				this.layers['HUD'].secretMessage = null;
				this.layers['HUD'].secretPaddle = null;
				this.changeState( this.states.starting );
			}
			this.layers['Kombat'].centerPaddles();
		break;

		case this.states.starting :
			if( this.stateTime >= 5 ) {
				this.changeState( this.states.fighting );
				this.setBall( 'RANDOM' );
				//this.layers['Kombat'].setBall( Balls.DEFAULT_BALL );
			} else {
				this.layers['Kombat'].centerPaddles( );
			}
		break;
		
		case this.states.fighting :
			if( app.gameMode === GameModes.TOURNAMENT ) {
				app.tournament.tournamentTimer += deltaTime;
			}

			if( leftKombatant )
			{
				if( leftKombatant.life <= 0 ) {
					++rightKombatant.roundsWon;
					this.layers['HUD'].components['RightRounds'].text = Array(rightKombatant.roundsWon+1).join('●');
					this.layers['Kombat'].removeComponent( 'Ball' );
					if( rightKombatant.life === this.startLife ) {
						++rightKombatant.flawlessRounds;
					}
					if( rightKombatant.roundsWon > app.settings.ROUNDS / 2 )
					{
						this.winner = rightKombatant;
						this.layers['HUD'].updateWinner( );

						if( app.settings.COMBAT ) {
							this.changeState( this.states.announcing );
						} else {
							this.changeState( this.states.ending );
						}
					}
					else
					{
						++this.currentRound;
						this.layers['HUD'].currentRound.text = 'Round ' + this.currentRound;
						this.nextRound( );
					}
				}
			}

			if( rightKombatant )
			{
				if( rightKombatant.life <= 0 ) {
					++leftKombatant.roundsWon;
					this.layers['HUD'].components['LeftRounds'].text = Array(leftKombatant.roundsWon+1).join('●');
					this.layers['Kombat'].removeComponent( 'Ball' );
					if( leftKombatant.life === this.startLife ) {
						++leftKombatant.flawlessRounds;
					}
					if( leftKombatant.roundsWon > app.settings.ROUNDS / 2 )
					{
						this.winner = leftKombatant;
						this.layers['HUD'].updateWinner( );

						if( app.settings.COMBAT ) {
							this.changeState( this.states.announcing );
						} else {
							this.changeState( this.states.ending );
						}
					}
					else
					{
						++this.currentRound;
						this.layers['HUD'].currentRound.text = 'Round ' + this.currentRound;
						this.nextRound( );
					}
				}
			}
			
			if( InputManager.checkButtonPress( [ Buttons.BACK, Buttons.START ] ) ) {
				InputManager.clear();
				this.changeState( this.states.paused );
			}
		break;
		
		case this.states.finishing :
			if( this.stateTime >= 5 ) {
				this.changeState( this.states.ending );
			}
		break;
		
		case this.states.dismantling :
			if( this.finishType === this.finishTypes.spamality ) {
				this.spamality( this.winner, this.winner === leftKombatant ? rightKombatant : leftKombatant );
			}
			else if( this.finishType === this.finishTypes.level ) {
				this.levelDismantle( this.winner, this.winner === leftKombatant ? rightKombatant : leftKombatant );
			} else {
				this.winner.paddle.dismantle( this.winner === leftKombatant ? rightKombatant : leftKombatant );
			}
		break;
		
		case this.states.ending :
			if( this.stateTime >= 3 && InputManager.checkButtonPress( [Buttons.ACTION, Buttons.START] ) ) {
				InputManager.clear();
				if( this.winner.roundsWon === this.winner.flawlessRounds && this.layers['Background'].components['Background'].resource === 'Background-Pit' && this.finishType !== null ) {
					var computer = new Computer( );
					computer.setPaddle( Paddles.MRSLAYER );
					
					var kombatScene = new KombatScene( );
					kombatScene.addKombatant( this.winner );
					kombatScene.addKombatant( computer );
					kombatScene.setLevel( Levels.HELL );
					SceneManager.changeScene( kombatScene, Transitions.NONE );
					return;
				}
				if( app.tournament ) {
					if( app.tournament.player === this.winner ) {
						app.tournament.increaseRank( );

						if( app.tournament.currentIndex >= app.tournament.opponents.length ) {
							if( typeof track === 'function' ) {
								track( 'completed-tournament' );
							}

							var storyScene = new StoryScene( );
							storyScene.setPaddle( Paddles[app.tournament.player.paddle.enum] );
							storyScene.setStory( app.tournament.player.paddle.endStory );
							storyScene.ending = true;
							SceneManager.changeScene( storyScene, Transitions.FADE, 0.5 );
						} else {
							app.tournament.changePlayer( app.tournament.player );
							app.tournament.timeElapsed = 0;
							SceneManager.changeScene( app.tournament, Transitions.FADE, 0.5 );
						}
					} else {
						SceneManager.changeScene( new PickPaddleScene( ), Transitions.NONE, 0.5 );
					}
				} else {
					SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
				}
			}
		break;
	}
};