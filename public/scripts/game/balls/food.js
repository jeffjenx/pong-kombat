function Food( texture ) {
	var textures = [
		'Ball-Easter-Egg-Blue', 'Ball-Easter-Egg-Green', 'Ball-Easter-Egg-Purple', 'Ball-Easter-Egg-Red', 'Ball-Easter-Egg-Yellow',
		'Ball-Food-Cookie', 'Ball-Food-Donut', 'Ball-Food-Pizza', 'Ball-Food-Plain-Bagel', 'Ball-Food-Salted-Bagel', 'Ball-Food-Waffle'
	];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.size.x = viewport.width * 0.04;
	if( this.resource === 'Ball-Food-Pizza' ) {
		this.size.x = viewport.width * 0.06;
	}
	this.size.y = this.size.x;

	this.rotationDirection = 1;
}

Food.prototype = new Ball;
Food.prototype.constructor = Food;

Food.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
}

Food.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
}

Food.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

Food.prototype.update = function( deltaTime ) {
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