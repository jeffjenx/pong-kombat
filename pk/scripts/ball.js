function Ball( ) {
	Sprite.call( this, 'Ball' );
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.02;
}

Ball.prototype = new Sprite;
Ball.prototype.constructor = Ball;

Ball.prototype.reset = function( ) {
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	
	this.velocity.x = ( Math.random( ) * 0.5 - 0.25 ) * viewport.height * 0.75;
	this.velocity.y = ( Math.random( ) * 0.5 - 0.25 ) * viewport.height * 0.75;
};

Ball.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
};