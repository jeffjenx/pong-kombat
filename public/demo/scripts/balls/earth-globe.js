function EarthGlobe( ) {
	Ball.call( this, 'Ball-Earth' );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.06;
	this.size.y = this.size.x;
	this.addGlare( );
}

EarthGlobe.prototype = new Ball;
EarthGlobe.prototype.constructor = EarthGlobe;

EarthGlobe.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	if( !this.enabled ) {
		return;
	}
	
	context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	context.beginPath();
	context.arc(0, 0, this.size.x * this.scale * 0.49, 0, 2 * Math.PI, false);
	context.clip();
	
	this.patternContext.translate( this.offset.x, 0 );
	this.patternContext.fill( );
	this.patternContext.translate( -this.offset.x, 0 );
	
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width,
		this.patternCanvas.height,
		-this.size.x * this.scale * 0.50,
		-this.size.y * this.scale * 0.50,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	if( this.glare ){
		this.glare.draw(context);
	}
};

EarthGlobe.prototype.update = function( deltaTime ) {
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = this.scale * 0.666;
		}
	} else {
		this.scale = this.scale;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = 0.666;
		}
		Sprite.prototype.update.call( this, deltaTime );
	}
	
	this.offset.x += 64 * deltaTime;
	
	this.updateGlare( deltaTime );
};