function HUDLayer( scene ) {
	Layer.call( this, scene );
	
	var playerScore = new Text( "0" );
	playerScore.color = "#FFFFFF";
	playerScore.position.x = viewport.width * 0.25;
	playerScore.position.y = viewport.height * 0.10;
	this.addComponent( 'PlayerScore', playerScore );
	
	var opponentScore = new Text( "0" );
	opponentScore.color = "#FFFFFF";
	opponentScore.position.x = viewport.width * 0.75;
	opponentScore.position.y = viewport.height * 0.10;
	this.addComponent( 'OpponentScore', opponentScore );
	
	console.log( this );
}

HUDLayer.prototype = new Layer;
HUDLayer.prototype.constructor = HUDLayer;

HUDLayer.prototype.update = function( deltaTime ) {
	this.components['PlayerScore'].text = this.scene.layers['Kombat'].components['Player'].score;
	this.components['OpponentScore'].text = this.scene.layers['Kombat'].components['Opponent'].score;
	
	Layer.prototype.update.call( this, deltaTime );
};