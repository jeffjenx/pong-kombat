function FoilBall( texture ) {
	var textures = [ 'Ball-Tin-Foil' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 512;
	this.patternCanvas.height = 512;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.05;
	this.size.y = this.size.x;

	this.addGlare( );
}

FoilBall.prototype = new Ball;
FoilBall.prototype.constructor = FoilBall;