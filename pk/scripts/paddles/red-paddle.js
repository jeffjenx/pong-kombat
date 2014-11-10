function RedPaddle( ) {
	this.enum = "RED"
	this.name = "Red Paddle";
	this.bigness = 2.00;
	this.quickness = 2.50;
	
	this.endStory = "red end story";
	this.story = "red story";
	
	Paddle.call( this, 'Paddle-Red' );
}

RedPaddle.prototype = new Paddle;
RedPaddle.prototype.constructor = RedPaddle;

RedPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

RedPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

RedPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};