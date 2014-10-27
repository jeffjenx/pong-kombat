function EarthBall( ) {
	Ball.call( this, 'Ball-Earth' );
	
	this.size.x = viewport.width * 0.04;
	this.size.y = this.size.x;
}

EarthBall.prototype = new Ball;
EarthBall.prototype.constructor = EarthBall;