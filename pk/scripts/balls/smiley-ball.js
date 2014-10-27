function SmileyBall( ) {
	Ball.call( this, 'Ball-Smiley' );
}

SmileyBall.prototype = new Ball;
SmileyBall.prototype.constructor = SmileyBall;