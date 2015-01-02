function TestScene( ) {
	Scene.call( this );
	
	this.layer = new Layer( );
	this.addLayer( 'Layer', this.layer );
	
	this.background = new Background( 'Background-Portal' );
	this.layer.addComponent( 'Background', this.background );

	this.ball = new Football( );
	this.layer.addComponent( 'Ball', this.ball );

	this.ball.set( );
}

TestScene.prototype = new Scene;
TestScene.prototype.constructor = TestScene;

TestScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( this.ball.boundingBox.right > viewport.width || this.ball.boundingBox.left < 0 ) {
		this.ball.velocity.x *= -1;
		//this.ball.hitPaddle();
	}

	if( this.ball.boundingBox.bottom > viewport.height || this.ball.boundingBox.top < 0 ) {
		//this.ball.velocity.y *= -1;
		this.ball.hitWall();
	}
};