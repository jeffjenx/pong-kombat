function SuperMario( texture ) {
	var textures = [ 'Ball-Super-Mario-Koopa-Shell', 'Ball-Super-Mario-Mushroom', 'Ball-Super-Mario-1Up', 'Ball-Super-Mario-Coin', 'Ball-Super-Mario-Star-Coin' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'SUPER_MARIO';
	this.size.x = viewport.width * 0.035;
	this.size.y = this.size.x;

	this.animations = {
		'Ball-Super-Mario-1Up' : { frames : [0, 1, 2, 3, 2, 1], step : 100 },
		'Ball-Super-Mario-Coin' : { frames : [0, 1, 2, 3, 4, 5, 6, 7, 8], step : 40 },
		'Ball-Super-Mario-Koopa-Shell' : { frames : [0, 1, 2, 3], step : 100 },
		'Ball-Super-Mario-Star-Coin' : { frames : [0, 1, 2, 3], step : 75 },
		'Ball-Super-Mario-Mushroom' : { frames : [0, 1, 2, 3, 2, 1], step : 100 }
	};
	this.currentAnimation = this.resource;
	this.currentFrame = 0;
	this.currentStep = 0;
	this.frame = { x : 0, y : 0, width : 256, height : 256 };

	if( this.resource === 'Ball-Super-Mario-Coin' ) {
		this.frame.width = 170;
		this.frame.height = 170;
	}
}

SuperMario.prototype = new Ball;
SuperMario.prototype.constructor = SuperMario;

SuperMario.prototype.draw = function( context ) {
	//SpriteSheet.prototype.draw.call( this, context );
	Component.prototype.draw.call( this, context );
	
	if( this.currentAnimation == null )
	{
		return;
	}
	
	if( this.currentFrame >= this.animations[this.currentAnimation].frames.length )
	{
		this.currentFrame = 0;
	}
	
	context.save( );
	context.globalAlpha = this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( Math.abs(this.rotation) > 90 && Math.abs(this.rotation) < 180 ) {
		context.scale( 1, -1 );
	}
	context.drawImage(
		this.image,
		this.frame.width * this.animations[this.currentAnimation].frames[this.currentFrame] % this.image.width,
		this.frame.height * Math.floor( this.frame.width * this.animations[this.currentAnimation].frames[this.currentFrame] / this.image.width ),
		this.frame.width,
		this.frame.height,
		-this.size.x * this.registration.x * this.scale,
		-this.size.y * this.registration.y * this.scale,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
};

SuperMario.prototype.update = function( deltaTime ) {
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = this.scale * 0.666 * this.opacity;
		}
	} else {
		this.scale = this.scale;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = 0.666 * this.opacity;
		}
		SpriteSheet.prototype.update.call( this, deltaTime );
	}
	
	this.offset.x += this.velocity.x * deltaTime * 3;
	this.offset.y += this.velocity.y * deltaTime * 3;
	
	this.sourceRotation = this.glare.rotation;
	this.targetRotation = this.rotation;
	if( this.velocity.x !== 0 || this.velocity.y !== 0 ) {
		this.rotation = Math.atan2( this.velocity.y, this.velocity.x ) * Math.TO_DEGREES;
	}
	
	this.updateCollision( );
	this.updateGlare( );
};