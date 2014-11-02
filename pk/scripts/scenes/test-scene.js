function TestScene( ) {
	Scene.call( this );
	
	var testLayer = new Layer( );
	this.addLayer( 'Test', testLayer );
	
	this.background = new Background( 'Background-Title' );
	testLayer.addComponent( 'Background', this.background );
	
	this.text = new Text( 'Testing...1. 2. 3?' );
	this.text.fontFamily = 'MK Mythologies';
	this.text.fontSize = viewport.height * 0.044;
	this.text.position.y = viewport.height * 0.23;
	testLayer.addComponent( 'Text', this.text );
	
	this.tester = new YellowPaddle( );
	this.tester.scale = 5;
	testLayer.addComponent( 'Tester', this.tester );
}

TestScene.prototype = new Scene;
TestScene.prototype.constructor = TestScene;

TestScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.isButtonDown( Buttons.LEFT ) ) {
		this.tester.position.x -= viewport.width * 0.25 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.RIGHT ) ) {
		this.tester.position.x += viewport.width * 0.25 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.UP ) ) {
		this.tester.position.y -= viewport.height * 0.25 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.DOWN ) ) {
		this.tester.position.y += viewport.height * 0.25 * deltaTime;
	}
};