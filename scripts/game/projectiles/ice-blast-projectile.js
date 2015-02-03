function IceBlastProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Ice-Blast' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.07;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.startPosition = this.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;

	this.effect = new ParticleSystem();
	this.effect.particleImages = [Resources['Particle-Smoke1'],Resources['Particle-Smoke2']];
	this.effect.count = 100;
	this.effect.minVelocity.x = -this.size.x * 0.25;
	this.effect.minVelocity.y = -this.size.y * 0.25;
	this.effect.maxVelocity.x = this.size.x * 0.25;
	this.effect.maxVelocity.y = this.size.y * 0.25;
	this.effect.minParticleSize = this.size.x * 0.3;
	this.effect.maxParticleSize = this.size.x * 0.5;
	this.effect.minLife = 10;
	this.effect.maxLife = 50;
	this.effect.maxOpacity = 0.4;
	this.effect.rotationSpeed = 1;
	this.effect.scaleSpeed = 5;
	this.effect.attachTo( this );
	this.effect.size.x = this.size.x * this.scale;
	this.effect.size.y = this.size.y * this.scale;

	for( var i = 0; i < this.effect.maxLife; i++ ) {
		this.effect.update( 1/60 );
	}
}

IceBlastProjectile.prototype = new Projectile;
IceBlastProjectile.prototype.constructor = IceBlastProjectile;

IceBlastProjectile.prototype.update = function( deltaTime ) {
	Projectile.prototype.update.call( this, deltaTime );

	this.position.y = this.startPosition + Math.cos( app.gameTime / 213 ) * this.size.y * this.scale;
};