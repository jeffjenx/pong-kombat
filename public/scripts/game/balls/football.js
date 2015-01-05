function Football( ) {
	Ball.call( this, 'Ball-Football-NFL' );
	
	this.size.x = viewport.width * 0.045;
	this.size.y = this.size.x;

	this.rotationDirection = 1;
}

Football.prototype = new Ball;
Football.prototype.constructor = Football;

Football.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
};

Football.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
};

Football.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

Football.prototype.update = function( deltaTime ) {
	//Ball.prototype.update.call( this, deltaTime );
	
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = this.scale * 0.666 * this.opacity;
		}
	} else {
		this.scale = this.scale;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = 0.666 * this.opacity;
		}
		Sprite.prototype.update.call( this, deltaTime );
	}

	this.rotation += this.rotationDirection * this.speed * 15 * deltaTime;
	if( this.rotation > 360 ){
		this.rotation -= 360;
	}
	if( this.rotation < 0 ) {
		this.rotation += 360;
	}
	
	this.updateCollision( );
};