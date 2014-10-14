function KombatScene( ) {	Scene.call( this );
		this.addLayer( 'Background', new BackgroundLayer( this ) );
	this.addLayer( 'Kombat', new KombatLayer( this ) );
	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.winningScore = 3;
	this.matchOver = false;}KombatScene.prototype = new Scene;KombatScene.prototype.constructor = KombatScene;

KombatScene.prototype.addKombatant = function( kombatant ) {
	this.layers['Kombat'].addKombatant( kombatant );
};

KombatScene.prototype.showWinner = function( winner ) {
	var winnerText = new Text( winner.paddle.name + ' Wins' );
	this.layers['HUD'].addComponent( 'Winner', winnerText );
	this.matchOver = true;
};

KombatScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	var leftKombatant = this.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.layers['Kombat'].components['RightKombatant'];
	
	if( !this.matchOver && leftKombatant.score >= this.winningScore || rightKombatant.score >= this.winningScore ) {
		this.showWinner( ( leftKombatant.score > rightKombatant.score ) ? leftKombatant : rightKombatant );
	}
	
	if( this.matchOver && InputManager.checkButtonPress( Buttons.ACTION ) ) {
		SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
	}
};