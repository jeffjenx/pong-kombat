function TitleScene( ) {
	Scene.call( this );
	
	if( Resources['Localization'].UseRTL == "true" )
	{
		document.body.style.direction = "rtl";
	}
	
	var titleLayer = this.addLayer( 'Title', new Layer( ) );
	
	this.background = new Background( 'Background-Title' );
	titleLayer.addComponent( 'Background', this.background );
	
	this.ball = new DefaultBall( );
	this.ball.scale = 2;
	this.ball.opacity = 0;
	this.ball.position.x = viewport.width * 0.80;
	this.ball.position.y = viewport.height * 0.20;
	this.ball.velocity.x = -viewport.width * 0.14;
	this.ball.velocity.y = viewport.height * 0.14;
	this.ball.changedRotation( );
	titleLayer.addComponent( 'Ball', this.ball );
	
	this.blue = new BluePaddle( );
	this.blue.scale = 4;
	this.blue.position.x = viewport.width * 0.80;
	this.blue.position.y = viewport.height * 0.20;
	this.blue.rotation = -60;
	this.blue.velocity.x = -Math.round( viewport.width * 0.25 * Math.cos( this.blue.rotation * Math.TO_RADIANS ) );
	this.blue.velocity.y = Math.round( viewport.width * 0.25 * Math.sin( this.blue.rotation * Math.TO_RADIANS ) );
	titleLayer.addComponent( 'Blue', this.blue );
	
	this.yellow = new YellowPaddle( );
	this.yellow.scale = 4;
	this.yellow.position.x = viewport.width * 0.20;
	this.yellow.position.y = viewport.height * 0.75;
	this.yellow.rotation = -60;
	//titleLayer.addComponent( 'Yellow', this.yellow );
	
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
	
	if( this.timeElapsed > 4 && this.timeElapsed < 8 ) {
		this.logo.opacity = ( this.timeElapsed - 4 ) / 2;
	}
	
	if( !this.layers['Menu'] && this.timeElapsed > 5 ) {
		this.text.opacity = 0.5 * Math.cos( 2 * Math.PI * this.timeElapsed * 0.5 ) + 0.5;
	}
	
	if( !this.layers['Menu'] && InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		this.addLayer( 'Menu', new TitleMenu( this ) );
	}
	
	if( this.ball.opacity < 1 ){
		this.ball.opacity += deltaTime;
	} else {
		this.ball.opacity = 1;
	}
	this.ball.velocity.x *= 0.99;
	this.ball.velocity.y *= 0.99;
	
	if( !this.layers['Menu'] && this.timeElapsed > 20 ) {
		var storyScene = new StoryScene( );
		storyScene.setPaddle( Paddles.RANDOM );
		storyScene.setStory( 'background' );
		SceneManager.changeScene( storyScene, Transitions.NONE );
	}
};