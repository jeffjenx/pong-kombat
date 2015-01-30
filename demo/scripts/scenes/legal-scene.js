function LegalScene( ) {
	Scene.call( this );
	
	var legalLayer = this.addLayer( 'Legal', new Layer( ) );
	
	this.background = new Background( 'Background-Black' );
	legalLayer.addComponent( 'Background', this.background );
	
	this.titleText = new Text( Resources['Localization']['LEGAL NOTE'] );
	this.titleText.fontFamily = 'MK Mythologies';
	this.titleText.fontSize = viewport.height * 0.064;
	this.titleText.position.y = viewport.height * 0.13;
	this.titleText.opacity = 0;
	legalLayer.addComponent( 'Title', this.titleText );
	
	this.legalText = new Text( Resources['Localization']['Legalities'] );
	this.legalText.fontFamily = 'Apple Garamond';
	this.legalText.fontSize = viewport.height * 0.05;
	this.legalText.lineHeight = 1.33;
	this.legalText.position.y = viewport.height * 0.25;
	this.legalText.opacity = 0;
	legalLayer.addComponent( 'Legal', this.legalText );
}

LegalScene.prototype = new Scene;
LegalScene.prototype.constructor = LegalScene;

LegalScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.timeElapsed > 1 && this.timeElapsed < 3 ) {
		this.titleText.opacity = ( this.timeElapsed - 1 ) / 2;
		this.legalText.opacity = ( this.timeElapsed - 1 ) / 2;
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) || this.timeElapsed > 25 ) {
		var titleScene = new TitleScene( );
		SceneManager.changeScene( titleScene, Transitions.FADE );
	}
};