function RedPaddle( ) {
	Paddle.call( this );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	this.tint = new Color( 255, 0, 0 );
	
	this.enum = "RED";
	this.name = "Red Paddle";
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