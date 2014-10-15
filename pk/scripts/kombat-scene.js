function KombatScene( ) {	Scene.call( this );
		this.addLayer( 'Background', new BackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.winningScore = 1;
	this.states = {
		starting : 0,
		fighting : 1,
		finishing : 3,
		ending : 4
	};
	this.state = this.states.starting;
	this.stateTime = 0;
	
	this.winner = null;}KombatScene.prototype = new Scene;KombatScene.prototype.constructor = KombatScene;

KombatScene.prototype.addKombatant = function( kombatant ) {
	this.layers['Kombat'].addKombatant( kombatant );
};

KombatScene.prototype.changeState = function( state ) {
	this.state = state;
	this.stateTime = 0;
};

KombatScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	this.stateTime += deltaTime;
	
	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];
	
	switch( this.state ) {
		case this.states.starting :
			if( this.stateTime >= 3 ) {
				this.changeState( this.states.fighting );
				this.layers['HUD'].removeComponent( 'Announcement' );
				this.layers['Kombat'].setBall( );
			}
		break;
		
		case this.states.fighting :
			if( leftKombatant.score >= this.winningScore || rightKombatant.score >= this.winningScore ) {
				this.changeState( this.states.finishing );
				this.winner = ( leftKombatant.score > rightKombatant.score ) ? leftKombatant : rightKombatant;
				this.stateTime = 0;
				var finishThem = new Text( 'Finish Them' );
				this.layers['Kombat'].removeComponent( 'Ball' );
				this.layers['HUD'].addComponent( 'FinishThem', finishThem );
			}
		break;
		
		case this.states.finishing :
			if( this.stateTime >= 3 ) {
				this.layers['HUD'].removeComponent( 'FinishThem' );
			} else {
				this.layers['Kombat'].centerPaddles( );
			}
			
			if( this.stateTime >= 6 ) {
				this.changeState( this.states.ending );
				this.layers['HUD'].addComponent( 'Winner', new Text( this.winner.paddle.name + ' Wins' ) );
			}
		break;
		
		case this.states.ending :
			if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
				SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
			}
		break;
	}
};