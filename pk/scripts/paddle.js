var Paddles = {
	RANDOM   : 0,
	CUSTOM   : 1,
	
	BLUE     : 2,
	GREEN    : 3,
	PURPLE   : 4,
	RED      : 5,
	YELLOW   : 6,
	
	SHIFTER  : 7,
	MONOLITH : 8,
	WHITE    : 9
};

function Paddle( ) {
	Sprite.call( this, 'Paddle' );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.15;
	
	this.projectile = null;
}

Paddle.prototype = new Sprite;
Paddle.prototype.constructor = Paddle;

Paddle.prototype.canShootProjectile = function( ) {
	return this.projectile === null;
};

Paddle.prototype.draw = function( context ) {
	Sprite.prototype.draw.call( this, context );
	
	if( this.projectile ) {
		this.projectile.draw( context );
	}
};

Paddle.prototype.moveDown = function( ) {
	this.velocity.y = viewport.height * 0.25;
	this.restrictToBounds( );
};

Paddle.prototype.moveUp = function( ) {
	this.velocity.y = -viewport.height * 0.25;
	this.restrictToBounds( );
};

Paddle.prototype.restrictToBounds = function( ) {
	var paddingBottom = viewport.height;
	var paddingTop = SceneManager.currentScene.layers['HUD'].components['HUD'].size.y;
	
	if( ( this.velocity.y > 0 && this.boundingBox.bottom >= paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top <= paddingTop ) )
	{
		this.velocity.y = 0;
	}
};

Paddle.prototype.shootProjectile = function( ) {
	this.projectile = new Projectile( this );
	this.projectile.position = copy( this.position );
	if( this.position.x < viewport.width * 0.50 ) {
		this.projectile.velocity.x = viewport.width * 0.25;
	} else {
		this.projectile.velocity.x = -viewport.width * 0.25;
	}
};

Paddle.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	if( this.projectile ) {
		this.projectile.update( deltaTime );
	}
	
	this.velocity = this.velocity.multiply( 0.9 );
};