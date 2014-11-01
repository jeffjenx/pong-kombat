function EarthBall( ) {
	Ball.call( this, 'Ball-Earth' );
	
	this.size.x = viewport.width * 0.06;
	this.size.y = this.size.x;
}

EarthBall.prototype = new Ball;
EarthBall.prototype.constructor = EarthBall;