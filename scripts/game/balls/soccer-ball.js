function SoccerBall( ) {
	Ball.call( this, 'Ball-Soccer' );
	
	this.enum = 'SOCCER_BALL';
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 420;
	this.patternCanvas.height = 420;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = viewport.width * 0.045;
	this.size.y = this.size.x;
	this.addGlare( );
}

SoccerBall.prototype = new Ball;
SoccerBall.prototype.constructor = SoccerBall;