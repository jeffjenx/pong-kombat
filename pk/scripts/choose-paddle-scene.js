function ChoosePaddleScene( ) {
	Scene.call( this );
	
	this.titleText = new Text( "Choose Your Paddle" );
	this.titleText.color = "#FFE8B8";
	this.titleText.fontFamily = "'Apple Garamond'";
	this.titleText.fontSize = viewport.height * 0.08;
	this.titleText.fontStyle = "200";
	this.titleText.position.x = viewport.width * 0.5;
	this.titleText.position.y = viewport.height * 0.2;
	this.titleText.textAlign = "center";
	
	this.paddles = new Array( );
	this.currentIndex = -1;
	
	var paddleLayer = this.addLayer( 'Paddles', new Layer( ) );
	
	var yellowPaddle = new YellowPaddle( );
	yellowPaddle.position.x = viewport.width * 0.25;
	yellowPaddle.position.y = viewport.height * 0.33;
	paddleLayer.addComponent( 'YellowPaddle', yellowPaddle );
	
	var bluePaddle = new BluePaddle( );
	bluePaddle.position.x = viewport.width * 0.75;
	bluePaddle.position.y = viewport.height * 0.33;
	paddleLayer.addComponent( 'BluePaddle', bluePaddle );
	
	var redPaddle = new RedPaddle( );
	redPaddle.position.x = viewport.width * 0.25;
	redPaddle.position.y = viewport.height * 0.67;
	paddleLayer.addComponent( 'RedPaddle', redPaddle );
	
	var greenPaddle = new GreenPaddle( );
	greenPaddle.position.x = viewport.width * 0.50;
	greenPaddle.position.y = viewport.height * 0.67;
	paddleLayer.addComponent( 'GreenPaddle', greenPaddle );
	
	var purplePaddle = new PurplePaddle( );
	purplePaddle.position.x = viewport.width * 0.75;
	purplePaddle.position.y = viewport.height * 0.67;
	paddleLayer.addComponent( 'PurplePaddle', purplePaddle );
	
	var randomPaddle = new Sprite( 'Paddle' );
	randomPaddle.enum = "RANDOM";
	randomPaddle.position.x = viewport.width * 0.50;
	randomPaddle.position.y = viewport.height * 0.33;
	randomPaddle.size.x = viewport.width * 0.10;
	randomPaddle.size.y = viewport.height * 0.10;
	randomPaddle.tint = new Color( 0, 213, 255 );
	paddleLayer.addComponent( 'RandomPaddle', randomPaddle );
	
	this.paddles.push( paddleLayer.components['YellowPaddle'] );
	this.paddles.push( paddleLayer.components['RandomPaddle'] );
	this.paddles.push( paddleLayer.components['BluePaddle'] );
	this.paddles.push( paddleLayer.components['RedPaddle'] );
	this.paddles.push( paddleLayer.components['GreenPaddle'] );
	this.paddles.push( paddleLayer.components['PurplePaddle'] );
	
	this.selectNextPaddle( 'Right' );
}

ChoosePaddleScene.prototype = new Scene;
ChoosePaddleScene.prototype.constructor = ChoosePaddleScene;

ChoosePaddleScene.prototype.draw = function( context ) {
	this.layers['Paddles'].draw( context );
	this.titleText.draw( context );
};

ChoosePaddleScene.prototype.selectNextPaddle = function( direction ) {
	if( this.paddles[this.currentIndex] ) {
		this.paddles[this.currentIndex].scale = 1.0;
	}
	
	switch( direction ) {
		case 'Down' :this.currentIndex += 3; break;
		case 'Left' : this.currentIndex -= 1; break;
		case 'Right' : this.currentIndex += 1; break;
		case 'Up' : this.currentIndex -= 3; break;
	}
	
	if( this.currentIndex > this.paddles.length - 1 ) {
		this.currentIndex -= this.paddles.length;
	}
	if( this.currentIndex < 0 ) {
		this.currentIndex += this.paddles.length;
	}
	
	this.paddles[this.currentIndex].scale = 1.5;
};

ChoosePaddleScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		var player = new Player( );
		player.setPaddle( Paddles[this.paddles[this.currentIndex].enum] );
		
		if( app.gameMode === GameModes.TOURNAMENT ) {
			var tournamentScene = new TournamentScene( );
			tournamentScene.startPlayer( player );
			SceneManager.changeScene( tournamentScene, Transitions.NONE );
		} else {
			var computer = new Opponent( );
			computer.setPaddle( Paddles.RANDOM );
			
			var kombatScene = new KombatScene( );
			kombatScene.addKombatant( player );
			kombatScene.addKombatant( computer );
			kombatScene.setLevel( Levels.RANDOM );
			SceneManager.changeScene( kombatScene, Transitions.NONE );
		}
	}
	
	if( InputManager.checkButtonPress( Buttons.DOWN ) ) {
		this.selectNextPaddle( 'Down' );
	}
	if( InputManager.checkButtonPress( Buttons.UP ) ) {
		this.selectNextPaddle( 'Up' );
	}
	if( InputManager.checkButtonPress( Buttons.LEFT ) ) {
		this.selectNextPaddle( 'Left' );
	}
	if( InputManager.checkButtonPress( Buttons.RIGHT ) ) {
		this.selectNextPaddle( 'Right' );
	}
};