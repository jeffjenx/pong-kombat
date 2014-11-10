function WhitePaddle( ) {
	this.enum = "WHITE"
	this.name = "White Paddle";
	this.bigness = 4.00;
	this.quickness = 5.00;
	
	this.endStory = "white end story";
	this.story = "white story";
	
	Paddle.call( this, 'Paddle-White' );
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