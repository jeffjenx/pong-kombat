function YellowPaddle( ) {
	Paddle.call( this );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	this.tint = new Color( 255, 255, 0 );
	
	this.name = "Yellow Paddle";
}

YellowPaddle.prototype = new Paddle;
YellowPaddle.prototype.constructor = YellowPaddle;

YellowPaddle.prototype.moveDown = function( ) {
	Paddle.prototype.moveDown.call( this );
	
	this.velocity.y = viewport.height * 0.25;
};

YellowPaddle.prototype.moveUp = function( ) {
	Paddle.prototype.moveUp.call( this );
	
	this.velocity.y = -viewport.height * 0.25;
};

YellowPaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this );
	this.projectile.tint = new Color( 255, 255, 0 );
};

YellowPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
};