function TestScene( ) {
	Scene.call( this );
	
	this.layer = new Layer( );
	this.addLayer( 'Layer', this.layer );
	
	this.background = new Background( 'Black' );
	this.layer.addComponent( 'Background', this.background );

	this.tester = new BilliardsBall( 'Ball-Billiards-3' );
	this.tester.scale = 5;
	this.layer.addComponent( 'Tester', this.tester );

	//this.resetBall( );
}

TestScene.prototype = new Scene;
TestScene.prototype.constructor = TestScene;

/*
TestScene.prototype.resetBall = function( ) {
	this.tester = new Basketball( 'Ball-Basketball-ABA' );
	this.layer.addComponent( 'Tester', this.tester );
	this.tester.set( );
};

TestScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.tester.boundingBox.right > viewport.width || this.tester.boundingBox.left < 0 ) {
		this.tester.velocity.x *= -1;
		this.tester.changedRotation();
	}

	if( this.tester.boundingBox.bottom > viewport.height || this.tester.boundingBox.top < 0 ) {
		this.tester.velocity.y *= -1;
		this.tester.changedRotation();
	}

	if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
		this.resetBall( );
	}
};
*/