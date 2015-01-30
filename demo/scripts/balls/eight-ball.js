function EightBall( ) {
	Ball.call( this, 'Ball-8Ball' );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.addGlare( );
}

EightBall.prototype = new Ball;
EightBall.prototype.constructor = EightBall;