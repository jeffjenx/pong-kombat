function Basketball( ) {
	Ball.call( this, 'Ball-Basketball' );
	
	this.size.x = viewport.width * 0.045;
	this.size.y = this.size.x;
}

Basketball.prototype = new Ball;
Basketball.prototype.constructor = Basketball;