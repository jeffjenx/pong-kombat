function CroquetBall( ) {
	var textures = [ 'Ball-Croquet-Black', 'Ball-Croquet-Blue', 'Ball-Croquet-Red', 'Ball-Croquet-Yellow' ];

	Ball.call( this, textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.032;
	this.size.y = this.size.x;
	this.addGlare( );
}

CroquetBall.prototype = new Ball;
CroquetBall.prototype.constructor = CroquetBall;