function PurplePaddle( ) {
	Paddle.call( this );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	this.tint = new Color( 255, 0, 255 );
	
	this.enum = "PURPLE";
	this.name = "Purple Paddle";
	this.endStory = "purple end story";
	this.story = "purple story";
}

PurplePaddle.prototype = new Paddle;
PurplePaddle.prototype.constructor = PurplePaddle;

PurplePaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

PurplePaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

PurplePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};