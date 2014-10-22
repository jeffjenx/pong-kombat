function SplashScene( ) {
	Scene.call( this );
	
	this.titleText = new Text( "Quantastically Made" );
	this.titleText.color = "#FFE8B8";
	this.titleText.fontFamily = "'Apple Garamond'";
	this.titleText.fontSize = viewport.height * 0.11;
	this.titleText.fontStyle = "200";
	this.titleText.position.x = viewport.width * 0.5;
	this.titleText.position.y = viewport.height * 0.5;
	this.titleText.textAlign = "center";
}

SplashScene.prototype = new Scene;
SplashScene.prototype.constructor = SplashScene;

SplashScene.prototype.draw = function( context ) {
	this.titleText.draw( context );
};

SplashScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) || this.timeElapsed >= 5 )
	{
		SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
	}
};