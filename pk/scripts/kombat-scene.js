function KombatScene( ) {	Scene.call( this );
		this.addLayer( 'Background', new BackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.winningScore = 3;
	this.states = {
		starting : 0,
		fighting : 1,
		finishing : 3,
		ending : 4
	};
	this.state = this.states.starting;
	this.stateTime = 0;}KombatScene.prototype = new Scene;KombatScene.prototype.constructor = KombatScene;

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
				this.stateTime = 0;
				var finishThem = new Text( 'Finish Them' );
				this.layers['HUD'].addComponent( 'FinishThem', finishThem );
			}
		break;
		
		case this.states.finishing :
			if( this.stateTime >= 3 ) {
				this.layers['HUD'].removeComponent( 'FinishThem' );
			}
			
			if( this.stateTime >= 5 ) {
				this.changeState( this.states.ending );
				var winner = ( leftKombatant.score > rightKombatant.score ) ? leftKombatant : rightKombatant;
				var winnerText = new Text( winner.paddle.name + ' Wins' );
				this.layers['HUD'].addComponent( 'Winner', winnerText );
			}
		break;
		
		case this.states.ending :
			if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
				SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
			}
		break;
	}
};