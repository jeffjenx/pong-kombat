function Basketball( texture ) {
	var textures = [ 'Ball-Basketball', 'Ball-Basketball-ABA', 'Ball-Basketball-Old', 'Ball-Basketball-NBA', 'Ball-Kickball' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'BASKETBALL';
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.045;
	this.size.y = this.size.x;
	this.addGlare( );
}

Basketball.prototype = new Ball;
Basketball.prototype.constructor = Basketball;

Basketball.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	if( !this.enabled ) {
		return;
	}
	
	context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( Math.abs(this.rotation) > 90 && Math.abs(this.rotation) < 180 ) {
		context.scale( 1, -1 );
	}
	context.beginPath();
	context.arc(0, 0, this.size.x * this.scale * 0.49, 0, 2 * Math.PI, false);
	context.clip();
	
	this.patternContext.translate( 128, this.offset.y );
	this.patternContext.fill( );
	this.patternContext.translate( -128, -this.offset.y );
	
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