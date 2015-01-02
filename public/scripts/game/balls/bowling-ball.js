function BowlingBall( ) {
	var textures = [ 'Ball-Bowling-Rose' ];

	Ball.call( this, textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.05;
	this.size.y = this.size.x;
	this.addGlare( );
}

BowlingBall.prototype = new Ball;
BowlingBall.prototype.constructor = BowlingBall;