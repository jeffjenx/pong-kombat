function Projectile( ) {
	Sprite.call( this, 'White' );
	
	this.size.x = viewport.height * 0.07;
	this.size.y = viewport.height * 0.07;
	this.scale = 0;

	this.hitSomething = false;
	this.lifeModifier = 1;
	this.rotate = true;

	this.absorbSound = new Sound( 'Shield-Absorb' );
}

Projectile.prototype = new Sprite;
Projectile.prototype.constructor = Projectile;

Projectile.prototype.draw = function( context ) {
	//Sprite.prototype.draw.call( this, context );

	if( !this.enabled ) {
		return;
	}
	
	context.save( );
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.size.x * this.scale * 0.49, 0, 2 * Math.PI, false);
	context.clip();
	
	Sprite.prototype.draw.call( this, context );
	
	context.restore( );

	if( this.effect ) {
		this.effect.draw( context );
	}
};

Projectile.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	if( this.sourcePaddle ) {
		if( this.boundingBox.left > viewport.width || this.boundingBox.right < 0 ) {
			this.sourcePaddle.projectiles.splice( this.sourcePaddle.projectiles.indexOf( this ), 1 );
		}	
	}

	if( this.scale < 1 ) {
		this.scale += deltaTime * 10; 
	}

	if( this.rotate ) {
		this.rotation += ( this.velocity.x > 0 ) ? 180 * deltaTime : -180 * deltaTime;
	}

	if( this.effect ) {
		this.effect.position = this.position;
		this.effect.rotation = this.rotation;
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;
		this.effect.scale = this.scale;
		this.effect.update( deltaTime );
	}

	if( this.sound ) {
		this.sound.setPan( this.position.x / viewport.width * 2 - 1 );
	}
};