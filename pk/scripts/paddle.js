function Paddle( ) {
	Sprite.call( this, 'Paddle' );
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
}

Paddle.prototype = new Sprite;
Paddle.prototype.constructor = Paddle;

Paddle.prototype.moveDown = function( ) {
	this.velocity.y = viewport.height * 0.25;
};

Paddle.prototype.moveUp = function( ) {
	this.velocity.y = -viewport.height * 0.25;
};

Paddle.prototype.restrictToBounds = function( ) {
	var paddingBottom = viewport.height;
	var paddingTop = 0;
	
	if( ( this.velocity.y > 0 && this.boundingBox.bottom > paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top < paddingTop ) )
	{
		this.velocity.y = 0;
	}
};

Paddle.prototype.shootProjectile = function( ) {
	var projectile = new Projectile( );
	projectile.position = copy( this.position );
	return projectile;
};

Paddle.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	this.velocity = this.velocity.multiply( 0.9 );
	this.restrictToBounds( );
};