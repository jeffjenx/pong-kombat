function Rupee( texture ) {
	var textures = [ 'Ball-Rupee-Green', 'Ball-Rupee-Blue', 'Ball-Rupee-Yellow', 'Ball-Rupee-Red', 'Ball-Rupee-Purple', 'Ball-Rupee-Orange', 'Ball-Rupee-Silver' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.size.x = viewport.width * 0.035;
	this.size.y = this.size.x;

	this.animations = {
		'rupee' : { frames : [0, 1, 2, 3], step : 213 }
	};
	this.currentAnimation = 'rupee';
	this.currentFrame = 0;
	this.currentStep = 0;
	this.frame = { x : 0, y : 0, width : 256, height : 256 };
}

Rupee.prototype = new Ball;
Rupee.prototype.constructor = Rupee;

Rupee.prototype.draw = function( context ) {
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
	context.rotate( (this.offset.x / 2) * Math.TO_RADIANS );
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

Rupee.prototype.update = function( deltaTime ) {
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