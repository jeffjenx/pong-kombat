function KombatScene( ) {
	Scene.call( this );
	
	this.addLayer( 'Background', new BackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'Foreground', new ForegroundLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.startLife = 1;
	this.states = {
		announcing : 0,
		starting : 1,
		fighting : 2,
		finishing : 3,
		dismantling : 4,
		ending : 5,
		paused : 6
	};

	this.state = null;
	
	//this.startMatch( );
	//this.changeState( this.states.fighting );
	//this.layers['Kombat'].setBall( Balls.DEFAULT );

	this.finishTypes = {
		dismantled : 0,
		spamality : 1
	}
	this.finishType = null;
	this.winner = null;
	this.currentRound = 1;

	this.screamSound = new Sound( 'Scream' );
	this.setLevel( Levels.RANDOM );
}

KombatScene.prototype = new Scene;
KombatScene.prototype.constructor = KombatScene;

KombatScene.prototype.addKombatant = function( kombatant ) {
	kombatant.life = this.startLife;
	this.layers['Kombat'].addKombatant( kombatant );
};

KombatScene.prototype.changeState = function( state ) {
	this.state = state;
	this.stateTime = 0;

	this.layers['HUD'].resetSounds();
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
	this.changeState( this.states.starting );
	this.winner = null;

	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];

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
			this.winner.paddle.dismantle( this.winner === leftKombatant ? rightKombatant : leftKombatant );
			
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
				if( app.tournament ) {
					if( app.tournament.player === this.winner ) {
						app.tournament.increaseRank( );
						if( app.tournament.currentIndex >= app.tournament.opponents.length ) {
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