function EarthBall( ) {
	Ball.call( this, 'Ball-Earth' );
	
	//this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	//this.patternContext.fillStyle = this.pattern;
	//this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	//this.patternContext.rect( -viewport.width, -viewport.height, viewport.width * 2, viewport.height * 2 );
	//this.patternContext.fill( );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	//this.patternCanvas.width = (this.image) ? this.image.width : 512;
	//this.patternCanvas.height = (this.image) ? this.image.height : 512;
	this.patternCanvas.width = 128;
	this.patternCanvas.height = 128;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.06;
	this.size.y = this.size.x;
	this.addGlare( );
}

EarthBall.prototype = new Ball;
EarthBall.prototype.constructor = EarthBall;