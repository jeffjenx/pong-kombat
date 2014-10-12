function KombatScene( ) {	Scene.call( this );
		this.addLayer( 'Background', new BackgroundLayer( this ) );	this.addLayer( 'Kombat', new KombatLayer( this ) );	this.addLayer( 'HUD', new HUDLayer( this ) );
	
	this.winningScore = 3;
	
	this.matchOver = false;}KombatScene.prototype = new Scene;KombatScene.prototype.constructor = KombatScene;

KombatScene.prototype.showWinner = function( winner ) {
	var winnerText = new Text( winner.tint.Hex( ) + ' Paddle Wins' );
	this.layers['HUD'].addComponent( 'Winner', winnerText );
	this.matchOver = true;
};

KombatScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	var player = this.layers['Kombat'].components['Player'];
	var opponent = this.layers['Kombat'].components['Opponent'];
	
	if( !this.matchOver && player.score >= this.winningScore || opponent.score >= this.winningScore ) {
		this.showWinner( ( player.score > opponent.score ) ? player : opponent );
	}
	
	if( this.matchOver && InputManager.checkButtonPress( Buttons.ACTION ) ) {
		SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
	}
};