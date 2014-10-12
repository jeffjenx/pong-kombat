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
	
	this.selectedText = new Text( "Yellow" );
	this.selectedText.color = "#FFE8B8";
	this.selectedText.fontFamily = "'Apple Garamond'";
	this.selectedText.fontSize = viewport.height * 0.05;
	this.selectedText.position.x = viewport.width * 0.5;
	this.selectedText.position.y = viewport.height * 0.8;
	this.selectedText.textAlign = "center";
}

ChoosePaddleScene.prototype = new Scene;
ChoosePaddleScene.prototype.constructor = ChoosePaddleScene;

ChoosePaddleScene.prototype.draw = function( context ) {
	this.titleText.draw( context );
	this.selectedText.draw( context );
};

ChoosePaddleScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		var nextScene = new KombatScene( );
		var player = nextScene.layers['Kombat'].components['Player'];
		
		player.tint = ( this.selectedText.text === "Yellow" ) ? new Color( 255, 255, 0 ) : new Color( 0, 0, 255 );
		nextScene.layers['Kombat'].components['Opponent'].tint = ( player.tint.blue === 255 ) ? new Color( 255, 255, 0 ) : new Color( 0, 0, 255 );
		
		SceneManager.changeScene( nextScene, Transitions.NONE );
		//SceneManager.changeScene( new KombatScene( ), Transitions.NONE );
	}
	
	if( InputManager.checkButtonPress( Buttons.DOWN ) || InputManager.checkButtonPress( Buttons.UP ) )
	{
		this.selectedText.text = ( this.selectedText.text === "Yellow" ) ? "Blue" : "Yellow";
	}
};