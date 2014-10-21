function KombatScene( ) {	Scene.call( this );
		this.addLayer( 'Background', new BackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'Foreground', new ForegroundLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.winningScore = 1;
	this.states = {
		announcing : 0,
		starting : 1,
		fighting : 2,
		finishing : 3,
		dismantling : 4,
		ending : 5
	};
	
	this.startMatch( );}KombatScene.prototype = new Scene;KombatScene.prototype.constructor = KombatScene;

KombatScene.prototype.addKombatant = function( kombatant ) {
	this.layers['Kombat'].addKombatant( kombatant );
};

KombatScene.prototype.changeState = function( state ) {
	this.state = state;
	this.stateTime = 0;
};

KombatScene.prototype.setLevel = function( level ) {
	switch( level ) {
		case Levels.RANDOM :
			this.setLevel( Math.ceil( Math.random( ) * 2 ) ); // TODO: count Levels property
		break;
		
		case Levels.DEFAULT :
			this.layers['Background'] = new DefaultBackgroundLayer( this );
			this.layers['Foreground'] = new DefaultForegroundLayer( this );
		break;
		
		case Levels.FOREST :
			this.layers['Background'] = new ForestBackgroundLayer( this );
			this.layers['Foreground'] = new ForestForegroundLayer( this );
		break;
	}
};

KombatScene.prototype.startMatch = function( ) {
	this.layers['HUD'].addAnnouncement( 'Bounce' );
	this.stateTime = 0;
	this.state = this.states.announcing;
	this.winner = null;
};

KombatScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	this.stateTime += deltaTime;
	
	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];
	
	switch( this.state ) {
		case this.states.announcing :
			if( this.stateTime >= 3 ) {
				this.layers['HUD'].removeComponent( 'Announcement' );
				if( this.winner === null ) {
					this.changeState( this.states.fighting );
					this.layers['Kombat'].setBall( );
				} else {
					this.changeState( this.states.finishing );
				}
			} else {
				this.layers['Kombat'].centerPaddles( );
			}
		break;
		
		case this.states.fighting :
			if( leftKombatant.score >= this.winningScore || rightKombatant.score >= this.winningScore ) {
				this.winner = ( leftKombatant.score > rightKombatant.score ) ? leftKombatant : rightKombatant;
				this.layers['Kombat'].removeComponent( 'Ball' );
				this.layers['HUD'].addAnnouncement( "Finish'm!" );
				this.changeState( this.states.announcing );
			}
		break;
		
		case this.states.finishing :
			if( this.stateTime >= 3 ) {
				this.changeState( this.states.ending );
				this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
			}
		break;
		
		case this.states.dismantling :
			this.layers['HUD'].cinemaMode( );
			this.winner.paddle.dismantle( this.winner === leftKombatant ? rightKombatant : leftKombatant );
	
			if( this.stateTime >= 7 ) {
				this.changeState( this.states.ending );
				this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
				
				var dismantled = new Text( 'Dismantled!' );
				dismantled.position.y = viewport.height * 0.60;
				this.layers['HUD'].addComponent( 'Dismantled', dismantled );
			}
		break;
		
		case this.states.ending :
			if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
				if( app.tournament ) {
					app.tournament.increaseRank( );
					SceneManager.changeScene( app.tournament, Transitions.NONE );
				} else {
					SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
				}
			}
		break;
	}
};