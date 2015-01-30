function EyeBall( texture ) {
	var textures = [ 'Ball-Eye-Amber', 'Ball-Eye-Blue', 'Ball-Eye-Brown', 'Ball-Eye-Cat', 'Ball-Eye-Green', 'Ball-Eye-Grey', 'Ball-Eye-Hazel', 'Ball-Eye-Red' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 512;
	this.patternCanvas.height = 512;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.04;
	this.size.y = this.size.x;
	this.addGlare( );

	this.rotationDirection = 1;
	this.nextMovement = 0;
}

EyeBall.prototype = new Ball;
EyeBall.prototype.constructor = EyeBall;

EyeBall.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
};

EyeBall.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
};

EyeBall.prototype.draw = function( context ) {
	//Ball.prototype.draw.call( this, context );
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
	
	this.patternContext.save();
	this.patternContext.translate( -this.offset.x, -this.offset.y );
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.height );
	this.patternContext.fill();
	this.patternContext.restore();

	context.drawImage(
		this.patternCanvas,
		// Source
		0,
		0,
		this.patternCanvas.width,
		this.patternCanvas.height,
		// Destination
		-this.size.x * this.scale * 0.50,
		-this.size.y * this.scale * 0.50,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	this.drawGlare( context );
};

EyeBall.prototype.update = function( deltaTime ) {
	//Ball.prototype.update.call( this, deltaTime );
	
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
		Sprite.prototype.update.call( this, deltaTime );
	}

	if( app.gameTime > this.nextMovement ) {
		this.rotation = Math.random( ) * 90 - 45;
		this.offset.x = Math.random( ) * this.patternCanvas.width / 6;
		this.offset.y = Math.random( ) * this.patternCanvas.width / 6;
		this.nextMovement += Math.random( ) * 5000;
	}

	this.updateCollision( );
	this.updateGlare( );
	this.updateBoundingBox( );
};