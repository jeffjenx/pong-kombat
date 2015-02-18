function Coin( texture ) {
	var textures = [ 'Ball-Coin-Penny', 'Ball-Coin-Nickle', 'Ball-Coin-Dime', 'Ball-Coin-Quarter' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'COIN';
	//this.size.x = viewport.width * 0.05;
	switch( this.resource ) {
		case 'Ball-Coin-Penny' : this.size.x = viewport.width * 0.035; break;
		case 'Ball-Coin-Nickle' : this.size.x = viewport.width * 0.04; break;
		case 'Ball-Coin-Dime' : this.size.x = viewport.width * 0.03; break;
		case 'Ball-Coin-Quarter' : this.size.x = viewport.width * 0.045; break;

	}
	this.size.y = this.size.x;

	this.rotationDirection = 1;
}

Coin.prototype = new Ball;
Coin.prototype.constructor = Coin;

Coin.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
}

Coin.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
}

Coin.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

Coin.prototype.update = function( deltaTime ) {
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