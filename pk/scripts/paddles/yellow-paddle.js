function YellowPaddle( ) {
	this.enum = "YELLOW"
	this.name = "Yellow Paddle";
	this.height = 3;
	
	Paddle.call( this, 'Paddle-Yellow' );
	
	this.endStory = "yellow end story";
	this.story = "yellow story";
}

YellowPaddle.prototype = new Paddle;
YellowPaddle.prototype.constructor = YellowPaddle;

YellowPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

YellowPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

YellowPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};