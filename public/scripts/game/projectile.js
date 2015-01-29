function Projectile( ) {
	Sprite.call( this, 'White' );
	
	this.size.x = viewport.height * 0.07;
	this.size.y = viewport.height * 0.07;
	//this.position.x = sourcePaddle.position.x;
	//this.position.y = sourcePaddle.position.y;
	//this.sourcePaddle = sourcePaddle;
	this.scale = 0;

	this.hitSomething = false;

	/*
	if( sourcePaddle.effect ) {
		this.effect = new ParticleSystem();
		this.effect.particleImages = sourcePaddle.effect.particleImages;
		this.effect.count = sourcePaddle.effect.count;
		this.effect.minVelocity.x = sourcePaddle.effect.minVelocity.x / 2;
		this.effect.minVelocity.y = sourcePaddle.effect.minVelocity.y / 2;
		this.effect.maxVelocity.x = sourcePaddle.effect.maxVelocity.x / 2;
		this.effect.maxVelocity.y = sourcePaddle.effect.maxVelocity.y / 2;
		this.effect.minParticleSize = sourcePaddle.effect.minParticleSize;
		this.effect.maxParticleSize = sourcePaddle.effect.maxParticleSize;
		this.effect.minLife = sourcePaddle.effect.minLife / 2;
		this.effect.maxLife = sourcePaddle.effect.maxLife / 2;
		this.effect.rotationSpeed = sourcePaddle.effect.rotationSpeed;
		this.effect.scaleSpeed = sourcePaddle.effect.scaleSpeed;
		this.effect.maxOpacity = sourcePaddle.effect.maxOpacity;
		this.effect.fadeSpeed = sourcePaddle.effect.fadeSpeed;
		this.effect.attachTo( this );
	}
	*/

	/*
	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Fire1'],Resources['Particle-Fire2'],Resources['Particle-Fire3']];
	this.effect.count = 250;
	this.effect.minVelocity.x = -this.size.x / 2;
	this.effect.minVelocity.y = -this.size.y / 2;
	this.effect.maxVelocity.x = this.size.x / 2;
	this.effect.maxVelocity.y = this.size.y / 2;
	this.effect.minParticleSize = this.size.x * 0.1 / 2;
	this.effect.maxParticleSize = this.size.x * 0.3 / 2;
	this.effect.minLife = 50 / 2;
	this.effect.maxLife = 100 / 2;
	this.effect.rotationSpeed = 5;
	this.effect.scaleSpeed = 5;
	this.effect.maxOpacity = 0.9;
	this.effect.fadeSpeed = 0.5;
	this.effect.attachTo( this );
	*/
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

Projectile.prototype.hitPaddle = function( ) {
	//console.log( 'hit paddle' );
};

Projectile.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	if( this.sourcePaddle ) {
		if( this.boundingBox.left > viewport.width || this.boundingBox.right < 0 ) {
			this.sourcePaddle.projectiles.splice( this.sourcePaddle.projectiles.indexOf( this ), 1 );
			//this.sourcePaddle.projectile = null;
		}	
	}

	if( this.scale < 1 ) {
		this.scale += deltaTime * 10; 
	}

	this.rotation += 180 * deltaTime;

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