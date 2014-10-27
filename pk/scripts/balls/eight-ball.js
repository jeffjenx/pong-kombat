function EightBall( ) {
	Ball.call( this, 'Ball-8Ball' );
}

EightBall.prototype = new Ball;
EightBall.prototype.constructor = EightBall;