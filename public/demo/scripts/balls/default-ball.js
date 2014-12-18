function DefaultBall( ) {
	Ball.call( this, 'Ball-Default' );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 64;
	this.patternCanvas.height = 64;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.addGlare( );
}

DefaultBall.prototype = new Ball;
DefaultBall.prototype.constructor = DefaultBall;