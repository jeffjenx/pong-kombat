function FireballProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Fireball' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.07;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.startPosition = this.position.y;
	this.sourcePaddle = sourcePaddle;
	this.opacity = 0.5;
	this.scale = 0;

	this.effect = new ParticleSystem();
	this.effect.particleImages = [Resources['Particle-Fire1'],Resources['Particle-Fire2'],Resources['Particle-Fire3']];
	this.effect.count = 150;
	this.effect.minVelocity.x = -this.size.x;
	this.effect.minVelocity.y = 0;
	this.effect.maxVelocity.x = this.size.x;
	this.effect.maxVelocity.y = -this.size.y;
	this.effect.minParticleSize = this.size.x * 0.1;
	this.effect.maxParticleSize = this.size.x * 0.3;
	this.effect.minLife = 10;
	this.effect.maxLife = 50;
	this.effect.rotationSpeed = 5;
	this.effect.scaleSpeed = 5;
	this.effect.maxOpacity = 0.9;
	this.effect.fadeSpeed = 0.666;
	this.effect.attachTo( this );

	for( var i = 0; i < this.effect.maxLife; i++ ) {
		this.effect.update( 1/60 );
	}
}

FireballProjectile.prototype = new Projectile;
FireballProjectile.prototype.constructor = FireballProjectile;

FireballProjectile.prototype.draw = function( context ) {
	Sprite.prototype.draw.call( this, context );
	
	if( this.effect ) {
		this.effect.draw( context );
	}
};

FireballProjectile.prototype.update = function( deltaTime ) {
	Projectile.prototype.update.call( this, deltaTime );

	this.position.y = this.startPosition + Math.sin( this.position.x / viewport.width * Math.PI * 4 ) * this.size.y * this.scale;
};