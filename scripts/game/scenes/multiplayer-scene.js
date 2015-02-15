function MultiplayerScene( ) {
	Scene.call( this );

	var backgroundLayer = this.addLayer( 'Background', new Layer( ) );
	backgroundLayer.addComponent( 'Background', new Background( 'Background-Title' ) );

	this.titleText = new Text( 'PADDLE-2-PADDLE' );
	this.titleText.fontFamily = 'MK Mythologies';
	this.titleText.fontSize = viewport.height * 0.08;
	this.titleText.position.y = viewport.height * 0.11;
	this.titleText.opacity = 1;
	backgroundLayer.addComponent( 'TitleText', this.titleText );

	this.subtitleText = new Text('Today\'s Top Players');
	this.subtitleText.fontFamily = 'Open Sans';
	this.subtitleText.fontSize = viewport.height * 0.05;
	this.subtitleText.position.y = viewport.height * 0.25;
	this.subtitleText.fontStyle = '600';
	backgroundLayer.addComponent( 'SubtitleText', this.subtitleText );

	for(var i = 0; i < 11; i++) {
		var playerText = new Text('1. Quantastical');
		playerText.fontFamily = 'Open Sans';
		playerText.fontSize = viewport.height * 0.04;
		playerText.fontStyle = '500';
		playerText.position.y = viewport.height * 0.33 + playerText.fontSize * 1.5 * i;
		playerText.position.x = viewport.width * 0.2;
		playerText.textAlign = 'left';

		var scoreText = new Text('1200 (25 W - 33 L)');
		scoreText.fontFamily=  playerText.fontFamily;
		scoreText.fontSize = playerText.fontSize
		scoreText.fontStyle = '400';
		scoreText.position.y = playerText.position.y;
		scoreText.position.x = viewport.width - playerText.position.x;
		scoreText.textAlign = 'right';

		backgroundLayer.addComponent( 'Player' + i, playerText );
		backgroundLayer.addComponent( 'Score' + i, scoreText );
	}

	this.leftArrow = new Text('<');
	this.leftArrow.fontFamily = 'Open Sans';
	this.leftArrow.fontSize = viewport.height * 0.08;
	this.leftArrow.position.x = viewport.width * 0.1;
	this.leftArrow.textAlign = 'left';
	backgroundLayer.addComponent('LeftArrow', this.leftArrow);

	this.rightArrow = new Text('>');
	this.rightArrow.fontFamily = 'Open Sans';
	this.rightArrow.fontSize = viewport.height * 0.08;
	this.rightArrow.position.x = viewport.width - this.leftArrow.position.x;
	this.rightArrow.textAlign = 'right';
	backgroundLayer.addComponent('ReftArrow', this.rightArrow);
}

MultiplayerScene.prototype = new Scene;
MultiplayerScene.prototype.constructor = MultiplayerScene;

MultiplayerScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );

	if( !this.layers['Menu'] && InputManager.checkButtonPress( [ Buttons.BACK, Buttons.START ] ) )
	{
		InputManager.clear();
		this.addLayer( 'Menu', new MultiplayerMenu( this ) );
	}
};