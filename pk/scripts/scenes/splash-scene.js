function SplashScene( ) {
	Scene.call( this );
	
	var splashLayer = this.addLayer( 'Splash', new Layer( ) );
	
	var background = new Background( 'Black' );
	splashLayer.addComponent( 'Background', background );
	
	var painted = new Sprite( 'Quantastical-Painted' );
	painted.position.x = viewport.width * 0.50;
	painted.position.y = viewport.height * 0.40;
	painted.opacity = 0;
	painted.scale = viewport.height / 1080;
	splashLayer.addComponent( 'Painted', painted );
	
	var domain = new Sprite( 'Quantastical-Domain' );
	domain.opacity = 0;
	domain.position.x = viewport.width * 0.50;
	domain.position.y = viewport.height * 0.75;
	domain.scale = viewport.height / 1080;
	splashLayer.addComponent( 'Domain', domain );
}

SplashScene.prototype = new Scene;
SplashScene.prototype.constructor = SplashScene;

SplashScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.timeElapsed > 1 && this.timeElapsed < 3 ) {
		this.layers['Splash'].components['Painted'].opacity = ( this.timeElapsed - 1 ) / 2;
		this.layers['Splash'].components['Domain'].opacity = ( this.timeElapsed - 1 ) / 2;
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) || this.timeElapsed >= 8 )
	{
		SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
	}
};