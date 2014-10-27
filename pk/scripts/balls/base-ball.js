function Baseball( ) {
	Ball.call( this, 'Ball-Baseball' );
}

Baseball.prototype = new Ball;
Baseball.prototype.constructor = Baseball;