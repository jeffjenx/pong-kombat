function SplashScene( ) {
	Scene.call( this );
	
	var splashLayer = this.addLayer( 'Splash', new Layer( ) );
	
	this.background = new Background( 'Background-Black' );
	splashLayer.addComponent( 'Background', this.background );

	this.logo = new Sprite( 'Quantastical-Painted' );
	this.logo.position.x = viewport.width * 0.50;
	this.logo.position.y = viewport.height * 0.40;
	this.logo.opacity = 1;
	this.logo.scale = viewport.height / 1080;
	splashLayer.addComponent( 'Logo', this.logo );
	
	this.domain = new Sprite( 'Quantastical-Domain' );
	this.domain.opacity = 1;
	this.domain.position.x = viewport.width * 0.50;
	this.domain.position.y = viewport.height * 0.75;
	this.domain.scale = viewport.height / 1080;
	splashLayer.addComponent( 'Domain', this.domain );
}
SplashScene.prototype = new Scene;
SplashScene.prototype.constructor = SplashScene;

SplashScene.prototype.draw = function( context ) {
	Scene.prototype.draw.call( this, context );
};

SplashScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.timeElapsed > 1 && this.timeElapsed < 3 ) {
		this.logo.opacity = ( this.timeElapsed - 1 ) / 2;
		this.domain.opacity = ( this.timeElapsed - 1 ) / 2;
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) || this.timeElapsed >= 10 )
	{
		SceneManager.changeScene( new LegalScene( ), Transitions.FADE );
	}
};