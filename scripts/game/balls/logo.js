function Logo( texture ) {
	var textures = [ 'Ball-Logo-Android', 'Ball-Logo-Apple', 'Ball-Logo-BMW', 'Ball-Logo-Chrome', 'Ball-Logo-Facebook',
	'Ball-Logo-Facebook', 'Ball-Logo-Firefox', 'Ball-Logo-IE', 'Ball-Logo-Pepsi', 'Ball-Logo-Pinterest', 'Ball-Logo-Safari',
	'Ball-Logo-Starbucks', 'Ball-Logo-Twitter', 'Ball-Logo-Volkswagen', 'Ball-Logo-Wikipedia', 'Ball-Logo-WordPress',
	'Ball-Logo-Obama', 'Ball-Yin-Yang', 'Ball-Yarn', 'Ball-Rubber-Band', 'Ball-Skull', 'Ball-Saw-Blade', 'Ball-Loading', 'Ball-Stop-Sign', 'Ball-Clock', 'Ball-Tron-Disc',
	'Ball-BBS-Wheel' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'LOGO';
	this.size.x = viewport.width * 0.045;
	if( this.resource === 'Ball-Saw-Blade' || this.resource === 'Ball-Tron-Disc' || this.resource === 'Ball-BBS-Wheel' ) {
		this.size.x = viewport.width * 0.05;
	} else if( this.resource === 'Ball-Loading' ) {
		this.size.x = viewport.width * 0.035;
	}
	this.size.y = this.size.x;

	this.rotationDirection = 1;
}

Logo.prototype = new Ball;
Logo.prototype.constructor = Logo;

Logo.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
}

Logo.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
}

Logo.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

Logo.prototype.update = function( deltaTime ) {
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