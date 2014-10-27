function DefaultBall( ) {
	Ball.call( this, 'Ball-Default' );
}

DefaultBall.prototype = new Ball;
DefaultBall.prototype.constructor = DefaultBall;