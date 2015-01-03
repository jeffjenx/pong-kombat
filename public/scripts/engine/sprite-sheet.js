function SpriteSheet( resource ) {
	Component.call( this );
	
	if( Resources[resource] !== undefined )
	{
		this.flipH = false;
		this.resource = resource;
		this.image = Resources[resource];
	}
	
	this.animations = { };
	/* Example:
	** {
	** 	'MyAnimation' : {
	** 		'frames' : [ 0, 1, 2, 1 ],
	** 		'step' : 1000
	** 	}
	** }
	*/
	this.currentAnimation = null;
	this.currentFrame = 0;
	this.currentStep = 0;
	this.frame = { x : 0, y : 0, width : 64, height : 64 };
};

SpriteSheet.prototype = new Component;
SpriteSheet.prototype.constructor = SpriteSheet;

SpriteSheet.prototype.draw = function( context ) {
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
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	context.rotate( this.rotation * Math.TO_RADIANS );
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

SpriteSheet.prototype.update = function( deltaTime ) {
	Component.prototype.update.call( this, deltaTime );
	
	if( this.currentAnimation == null )
	{
		return;
	}
	
	this.currentStep += deltaTime * 1000;
	if( this.currentStep >= this.animations[this.currentAnimation].step )
	{
		this.currentFrame += 1;
		this.currentStep = 0;
	}
	
	if( this.currentFrame >= this.animations[this.currentAnimation].frames.length )
	{
		this.currentFrame = 0;
	}
};