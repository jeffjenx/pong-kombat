function PokeBall( ) {
	Ball.call( this, 'Ball-PokeBall' );
	
	this.enum = 'POKEBALL';
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.035;
	this.size.y = this.size.x;
	this.addGlare( );
}

PokeBall.prototype = new Ball;
PokeBall.prototype.constructor = PokeBall;