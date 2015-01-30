function PongBall( ) {
	Ball.call( this, 'White' );
	
	this.size.x = viewport.width * 0.02;
	this.size.y = this.size.x;

	this.rotation = 0;
}

PongBall.prototype = new Ball;
PongBall.prototype.constructor = PongBall;

PongBall.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

PongBall.prototype.update = function( context ) {
	Ball.prototype.update.call( this, context );

	this.rotation = 0;
};