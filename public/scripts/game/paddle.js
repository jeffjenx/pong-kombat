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
	
	if( !this.quickness ) {
		this.quickness = 3;
	}
	
	this.gloss = new Sprite( 'Paddle-Gloss' );
	
	this.patternCanvas = document.createElement( 'canvas' );
	this.patternCanvas.width = ( this.image ) ? this.image.width : 512;
	this.patternCanvas.height = ( this.image ) ? this.image.height : 512;
	this.patternContext = this.patternCanvas.getContext( '2d' );
	
	this.offset = 0.5;
	this.size.x = viewport.width * 0.025;
	//this.size.y = viewport.height * 0.2;
	this.size.y = viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.08 ); 
	
	// Bigness Scale (size.y)
	// 2.0 ~ .12
	// 2.5 ~ .135
	// 3.0 ~ .15
	// 3.5 ~ .175
	// 4.0 ~ .20
	// 4.5 ~ .225
	// 5.0 ~ .25
	
	// Quickness Scale (velocity.y)
	// 2.0 ~ 
	// 2.5 ~ 
	// 3.0 ~ 
	// 3.5 ~ 
	// 4.0 ~ 
	// 4.5 ~ 
	// 5.0 ~ 
	
	this.projectile = null;
}

Paddle.prototype = new Sprite;
Paddle.prototype.constructor = Paddle;

Paddle.prototype.canShootProjectile = function( ) {
	return app.settings.COMBAT && this.projectile === null;
};

Paddle.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, 0 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 2, this.patternCanvas.height * 2 );
	this.patternContext.restore( );
	
	var width = this.size.x * this.scale;
	var height = this.size.y * this.scale;
	var x = -width * this.registration.x;
	var y = -height * this.registration.y;
	var radius = width * 0.50;
	
	context.save();
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.clip();
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * this.registration.x,
		-height * this.registration.y,
		width,
		height
	);
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 6.5,
		-height * this.registration.y * 1.15,
		width * 6.5,
		height * 1.15
	);
	context.restore();
	
	/*
	context.save();
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.clip();
	//context.restore();
	//context.save( );
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
		-width * this.registration.x,
		-height * this.registration.y,
		width,
		height
	);
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 7,
		-height * this.registration.y * 1.15,
		width * 7,
		height * 1.15
	);
	context.restore( );
	*/
	
	if( this.projectile ) {
		this.projectile.draw( context );
	}
};

Paddle.prototype.moveDown = function( ) {
	this.offset = this.position.y / viewport.height * 0.75;
	
	this.velocity.y = viewport.height * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.2 );
	this.restrictToBounds( );
};

Paddle.prototype.moveUp = function( ) {
	this.offset = this.position.y / viewport.height * 0.75;
	
	this.velocity.y = -viewport.height * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.2 );
	this.restrictToBounds( );
};

Paddle.prototype.moveLeft = function( ) {
	//this.offset = this.position.y / viewport.height * 0.75;
	
	this.velocity.x = -viewport.width * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.1 );
	this.restrictToBounds( );
};

Paddle.prototype.moveRight = function( ) {
	//this.offset = this.position.y / viewport.height * 0.75;
	
	this.velocity.x = viewport.width * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.1 );
	this.restrictToBounds( );
};

Paddle.prototype.restrictToBounds = function( ) {
	var paddingBottom = viewport.height;
	var paddingTop = SceneManager.currentScene.layers['HUD'].components['HUD'].size.y;
	var paddingLeft = 0;
	var paddingRight = viewport.width * 0.5;
	
	if( ( this.velocity.y > 0 && this.boundingBox.bottom >= paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top <= paddingTop ) )
	{
		this.velocity.y = 0;
	}

	if( ( this.velocity.x > 0 && this.boundingBox.right >= paddingRight ) || ( this.velocity.x < 0 && this.boundingBox.left <= paddingLeft ) )
	{
		this.velocity.x = 0;
	}
};

Paddle.prototype.shootProjectile = function( ) {
	this.projectile = new Projectile( this );
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		this.projectile.velocity.x *= -1;
	}
	/*
	if( this.position.x < viewport.width * 0.50 ) {
		this.projectile.velocity.x = viewport.width * 0.25;
	} else {
		this.projectile.velocity.x = -viewport.width * 0.25;
	}
	*/

	if( this.projectile.effect ) {
		this.projectile.effect.minVelocity.x += this.projectile.velocity.x / 2;
		this.projectile.effect.maxVelocity.x += this.projectile.velocity.x / 2;
		this.projectile.effect.minVelocity.y += this.projectile.velocity.y / 2;
		this.projectile.effect.maxVelocity.y += this.projectile.velocity.y / 2;
	}
};

Paddle.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	//this.offset = this.position.y / viewport.height * 0.75;
	
	if( this.projectile ) {
		this.projectile.update( deltaTime );
	}
	
	this.velocity = this.velocity.multiply( 0.95 );
};