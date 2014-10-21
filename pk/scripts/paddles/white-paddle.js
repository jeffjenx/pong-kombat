function WhitePaddle( ) {
	Paddle.call( this );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	this.tint = new Color( 255, 255, 255 );
	
	this.enum = "WHITE";
	this.name = "White Paddle";
	this.endStory = "white end story";
	this.story = "white story";
}

WhitePaddle.prototype = new Paddle;
WhitePaddle.prototype.constructor = WhitePaddle;

WhitePaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

WhitePaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = this.tint;
};

WhitePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};