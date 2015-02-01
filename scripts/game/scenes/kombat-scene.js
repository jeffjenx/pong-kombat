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
	
	//this.startMatch( );
	//this.changeState( this.states.fighting );
	//this.layers['Kombat'].setBall( Balls.DEFAULT );

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

	if( app.settings.TUNES > 0 ) {
		switch( state ) {
			case this.states.announcing :
				this.music.stop();
			break;

			case this.states.finishing :
				if( this.layers['Kombat'].components['LeftKombatant'] ) {
					this.layers['Kombat'].components['LeftKombatant'].paddle.velocity.x = 0;
					this.layers['Kombat'].components['LeftKombatant'].paddle.velocity.y = 0;
				}
				if( this.layers['Kombat'].components['RightKombatant'] ) {
					this.layers['Kombat'].components['RightKombatant'].paddle.velocity.x = 0;
					this.layers['Kombat'].components['RightKombatant'].paddle.velocity.y = 0;
				}
			break;

			case this.states.dismantling :
				this.dismantleSound.play();
			break;
		}
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
				var percentComplete = ( frame.end > frame.start ) ? (sceneTime - frame.start) / (frame.end - frame.start) : 0;
				frame['action']( winner.paddle, loser.paddle, percentComplete );
			}
		}
	}
};

KombatScene.prototype.setBall = function( ball ) {
	this.layers['Kombat'].setBall( Balls.DEFAULT );
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

	if( Math.random() < 0.05 && leftKombatant.paddle.enum !== 'MRSLAYER' && rightKombatant.paddle.enum !== 'MRSLAYER' ) {
		this.changeState( this.states.secretMessage );
		this.layers['HUD'].addSecretMessage();
	} else {
		this.changeState( this.states.starting );
	}
	
	if( leftKombatant )
	{
		leftKombatant.life = this.startLife;
		leftKombatant.paddle.opacity = 1;
		leftKombatant.paddle.scale = 1;
		//leftKombatant.paddle.position.x = viewport.width * 0.02;
		//leftKombatant.paddle.position.y = viewport.height * 0.50;
	}

	if( rightKombatant )
	{
		rightKombatant.life = this.startLife;
		rightKombatant.paddle.opacity = 1;
		rightKombatant.paddle.scale = 1;
		//rightKombatant.paddle.position.x = viewport.width * 0.98;
		//rightKombatant.paddle.position.y = viewport.height * 0.50;
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
		break;

		case this.states.starting :
			if( this.stateTime >= 5 ) {
				//this.layers['HUD'].removeComponent( 'Announcement' );
				this.changeState( this.states.fighting );
				this.layers['Kombat'].setBall( );
			} else {
				this.layers['Kombat'].centerPaddles( );
			}
		break;
		
		case this.states.fighting :
			if( leftKombatant )
			{
				if( leftKombatant.life <= 0 ) {
					++rightKombatant.roundsWon;
					this.layers['HUD'].components['RightRounds'].text = Array(rightKombatant.roundsWon+1).join('●');
					this.layers['Kombat'].removeComponent( 'Ball' );
					if( rightKombatant.roundsWon > app.settings.ROUNDS / 2 )
					{
						this.winner = rightKombatant;
						this.layers['HUD'].updateWinner( );

						if( app.settings.COMBAT ) {
							//this.layers['HUD'].addAnnouncement( "Finish'em!" );
							this.changeState( this.states.announcing );
						} else {
							this.changeState( this.states.ending );
							//this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
						}
					}
					else
					{
						++this.currentRound;
						this.layers['HUD'].currentRound.text = 'Round ' + this.currentRound;
						this.startMatch( );
					}
				}
			}

			if( rightKombatant )
			{
				if( rightKombatant.life <= 0 ) {
					++leftKombatant.roundsWon;
					this.layers['HUD'].components['LeftRounds'].text = Array(leftKombatant.roundsWon+1).join('●');
					this.layers['Kombat'].removeComponent( 'Ball' );
					if( leftKombatant.roundsWon > app.settings.ROUNDS / 2 )
					{
						this.winner = leftKombatant;
						this.layers['HUD'].updateWinner( );

						if( app.settings.COMBAT ) {
							//this.layers['HUD'].addAnnouncement( "Finish'em!" );
							this.changeState( this.states.announcing );
						} else {
							this.changeState( this.states.ending );
							//this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
						}
					}
					else
					{
						++this.currentRound;
						this.layers['HUD'].currentRound.text = 'Round ' + this.currentRound;
						this.startMatch( );
					}
				}
			}
			
			if( InputManager.checkButtonPress( Buttons.BACK ) ) {
				this.changeState( this.states.paused );
			}
		break;
		
		case this.states.finishing :
			if( this.stateTime >= 5 ) {
				this.changeState( this.states.ending );
				//this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
			}
		break;
		
		case this.states.dismantling :
			//this.layers['HUD'].cinemaMode( );
			if( this.finishType === this.finishTypes.spamality ) {
				this.spamality( this.winner, this.winner === leftKombatant ? rightKombatant : leftKombatant );
			}
			else if( this.finishType === this.finishTypes.level ) {
				this.levelDismantle( this.winner, this.winner === leftKombatant ? rightKombatant : leftKombatant );
			} else {
				this.winner.paddle.dismantle( this.winner === leftKombatant ? rightKombatant : leftKombatant );
			}
			
			/*
			if( this.stateTime > 2.5 && !this.screamSound.played && app.settings['SoundFX'] === true && !app.isMobile( ) )
			{
				this.screamSound.play( );
			}
			*/

			if( this.stateTime >= 7 ) {
				//this.changeState( this.states.ending );


				//this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
				//
				//var dismantled = new Text( 'Dismantled!' );
				//dismantled.position.y = viewport.height * 0.60;
				//this.layers['HUD'].addComponent( 'Dismantled', dismantled );
			}
		break;
		
		case this.states.ending :
			if( this.stateTime >= 3 && InputManager.checkButtonPress( Buttons.ACTION ) ) {
				if(this.finishType === this.finishTypes.dismantled && this.winner.life === this.startLife && this.layers['Background'].components['Background'].resource === 'Background-Pit') {
					var computer = new Opponent( );
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