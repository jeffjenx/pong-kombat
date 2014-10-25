function TitleScene( ) {
	Scene.call( this );
	
	if( Resources['Localization'].UseRTL == "true" )
	{
		document.body.style.direction = "rtl";
	}
	
	var titleLayer = this.addLayer( 'Title', new Layer( ) );
	
	this.background = new Background( 'Background-Title' );
	titleLayer.addComponent( 'Background', this.background );
	
	this.logo = new Sprite( 'Logo' );
	this.logo.position.x = viewport.width * 0.50;
	this.logo.position.y = viewport.height * 0.40;
	this.logo.opacity = 0;
	this.logo.scale = viewport.height / 1080;
	titleLayer.addComponent( 'Logo', this.logo );
	
	this.text = new Text( Resources['Localization']['PRESS SPACEBAR'] + ' ' + Resources['Localization']['TO BEGIN'] );
	this.text.fontFamily = 'MK Mythologies';
	this.text.fontSize = viewport.height * 0.044;
	this.text.position.y = viewport.height * 0.67;
	this.text.opacity = 0;
	titleLayer.addComponent( 'Text', this.text );
}

TitleScene.prototype = new Scene;
TitleScene.prototype.constructor = TitleScene;

TitleScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.timeElapsed > 1 && this.timeElapsed < 3 ) {
		this.logo.opacity = ( this.timeElapsed - 1 ) / 2;
	}
	
	if( !this.layers['Menu'] && this.timeElapsed > 5 ) {
		this.text.opacity = 0.5 * Math.cos( 2 * Math.PI * this.timeElapsed * 0.5 ) + 0.5;
	}
	
	if( !this.layers['Menu'] && InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		this.addLayer( 'Menu', new TitleMenu( this ) );
	}
	
	if( !this.layers['Menu'] && this.timeElapsed > 20 ) {
		var storyScene = new StoryScene( );
		storyScene.setPaddle( Paddles.RANDOM );
		storyScene.setStory( 'background' );
		SceneManager.changeScene( storyScene, Transitions.NONE );
	}
};