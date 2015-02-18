function Marble( texture ) {
	var textures = [ 'Ball-Marble-Brown', 'Ball-Marble-Lavender', 'Ball-Marble-Mint', 'Ball-Marble-Orange', 'Ball-Marble-Pink', 'Ball-Marble-Teal', 'Ball-Bouncy' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'MARBLE';
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.03;
	this.size.y = this.size.x;
	this.addGlare( );
}

Marble.prototype = new Ball;
Marble.prototype.constructor = Marble;