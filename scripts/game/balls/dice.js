function Dice( texture ) {
	var textures = [
		'Ball-Dice-Red-1', 'Ball-Dice-Red-2', 'Ball-Dice-Red-3', 'Ball-Dice-Red-4', 'Ball-Dice-Red-5', 'Ball-Dice-Red-6',
		'Ball-Dice-White-1', 'Ball-Dice-White-2', 'Ball-Dice-White-3', 'Ball-Dice-White-4', 'Ball-Dice-White-5', 'Ball-Dice-White-6',
		'Ball-Dice-12-Sided', 'Ball-Dice-20-Sided'
	];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'DICE';
	if( this.resource === 'Ball-Dice-20-Sided' ) {
		this.size.x = viewport.width * 0.033;
	} else if( this.resource === 'Ball-Dice-12-Sided' ) {
		this.size.x = viewport.width * 0.03;
	} else {
		this.size.x = viewport.width * 0.025;
	}
	this.size.y = this.size.x;

	this.rotationDirection = 1;
}

Dice.prototype = new Ball;
Dice.prototype.constructor = Dice;

Dice.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
}

Dice.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
}

Dice.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

Dice.prototype.update = function( deltaTime ) {
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