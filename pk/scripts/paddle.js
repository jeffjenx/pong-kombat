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

function Paddle( texture ) {
	Sprite.call( this, texture );
	
	if( !this.bigness ) {
		this.bigness = 3;
	}
	
	this.patternCanvas = document.createElement( 'canvas' );
	this.patternCanvas.width = ( this.image ) ? this.image.width : 512;
	this.patternCanvas.height = ( this.image ) ? this.image.height : 512;
	this.patternContext = this.patternCanvas.getContext( '2d' );
	
	this.offset = 0.5;
	this.size.x = viewport.width * 0.02;
	//this.size.y = viewport.height * 0.2;
	this.size.y = viewport.height * ( 0.007 * Math.pow( this.bigness, 2 ) + 0.08 ); 
	
	// Bigness Scale
	// 2.0 ~ .12
	// 2.5 ~ .135
	// 3.0 ~ .15
	// 3.5 ~ .175
	// 4.0 ~ .20
	// 4.5 ~ .225
	// 5.0 ~ .25
	
	this.projectile = null;
}

Paddle.prototype = new Sprite;
Paddle.prototype.constructor = Paddle;

Paddle.prototype.canShootProjectile = function( ) {
	return this.projectile === null;
};

Paddle.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, 0 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 2, this.patternCanvas.height * 2 );
	this.patternContext.restore( );
	
	context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		
		-this.size.x * this.registration.x * this.scale,
		-this.size.y * this.registration.y * this.scale,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
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
	
	this.offset = this.position.y / viewport.height * 0.75;
	
	if( this.projectile ) {
		this.projectile.update( deltaTime );
	}
	
	this.velocity = this.velocity.multiply( 0.9 );
};