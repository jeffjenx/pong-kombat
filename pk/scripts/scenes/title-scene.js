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
	this.ball.startPosition = {x: viewport.width * 0.65, y: viewport.height * 0.30};
	this.ball.endPosition = {x: viewport.width * 0.45, y: viewport.height * 0.55};
	this.ball.position.x = this.ball.startPosition.x;
	this.ball.position.y = this.ball.startPosition.y;
	this.ball.targetRotation = 135;
	titleLayer.addComponent( 'Ball', this.ball );
	
	this.blue = new BluePaddle( );
	this.blue.scale = 4;
	this.blue.startPosition = {x: viewport.width * 1.20, y: viewport.height * 0.50};
	this.blue.endPosition = {x: viewport.width * 0.80, y: viewport.height * 0.20};
	this.blue.position.x = this.blue.startPosition.x;
	this.blue.position.y = this.blue.startPosition.y;
	this.blue.rotation = -60;
	titleLayer.addComponent( 'Blue', this.blue );
	
	this.yellow = new YellowPaddle( );
	this.yellow.scale = 4;
	this.yellow.startPosition = {x: viewport.width * -0.20, y:viewport.height * 0.45};
	this.yellow.endPosition = {x: viewport.width * 0.20, y:viewport.height * 0.75};
	this.yellow.position.x = this.yellow.startPosition.x;
	this.yellow.position.y = this.yellow.startPosition.y;
	this.yellow.rotation = -60;
	titleLayer.addComponent( 'Yellow', this.yellow );
	
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
	
	this.easePosition( 1, 5, this.ball );
	this.easePosition( 1, 5, this.yellow );
	this.easePosition( 1, 5, this.blue );
	
	if( !this.layers['Menu'] && this.timeElapsed > 20 ) {
		var storyScene = new StoryScene( );
		storyScene.setPaddle( Paddles.RANDOM );
		storyScene.setStory( 'background' );
		SceneManager.changeScene( storyScene, Transitions.NONE );
	}
};

TitleScene.prototype.ballInterpolation = function( startTime, endTime ) {
	if( this.timeElapsed > startTime && this.timeElapsed < endTime ) {
		var time = 1 - (this.timeElapsed - startTime) / (endTime - startTime);
		
		this.ball.opacity = (1 - time) * 2;
		
		this.ball.position.x = this.ball.endPosition.x - (this.ball.endPosition.x - this.ball.startPosition.x) * time * time;
		this.ball.position.y = this.ball.endPosition.y - (this.ball.endPosition.y - this.ball.startPosition.y) * time * time;
	} else if( this.timeElapsed > endTime && this.ball.opacity != 1 ) {
		this.ball.opacity = 1;
		this.ball.position.x = this.ball.endPosition.x;
		this.ball.position.y = this.ball.endPosition.y;
	}
};

TitleScene.prototype.easePosition = function( startTime, endTime, component ) {
	if( this.timeElapsed > startTime && this.timeElapsed < endTime ) {
		var time = 1 - (this.timeElapsed - startTime) / (endTime - startTime);
		
		component.opacity = (1 - time) * 2;
		
		component.position.x = component.endPosition.x - (component.endPosition.x - component.startPosition.x) * time * time;
		component.position.y = component.endPosition.y - (component.endPosition.y - component.startPosition.y) * time * time;
	} else if( this.timeElapsed > endTime && component.opacity != 1 ) {
		component.opacity = 1;
		component.position.x = component.endPosition.x;
		component.position.y = component.endPosition.y;
	}
};