function BluePaddle( ) {
	this.enum = "BLUE";
	this.name = "Blue Paddle";
	this.bigness = 3;
	
	Paddle.call( this, 'Paddle-Blue' );
	
	this.endStory = "blue end story";
	this.story = "blue story";
}

BluePaddle.prototype = new Paddle;
BluePaddle.prototype.constructor = BluePaddle;

BluePaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

BluePaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

BluePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};