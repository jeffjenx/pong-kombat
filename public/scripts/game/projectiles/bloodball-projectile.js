function BloodballProjectile( sourcePaddle ) {
	Sprite.call( this, 'Particle-Blood1' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.07;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Blood1'],Resources['Particle-Blood2']];
	this.effect.compositeOperation = 'normal';
	this.effect.count = 50;
	this.effect.minVelocity.x = -this.size.x / 2;
	this.effect.minVelocity.y = -this.size.y * 3;
	this.effect.maxVelocity.x = this.size.x / 2;
	this.effect.maxVelocity.y = -this.size.y;
	this.effect.minParticleSize = this.size.x * 0.3;
	this.effect.maxParticleSize = this.size.x * 0.5;
	this.effect.minLife = 100;
	this.effect.maxLife = 600;
	this.effect.rotationSpeed = 0;
	this.effect.scaleSpeed = 0.01;
	this.effect.maxOpacity = 50;
	this.effect.fadeSpeed = 0.9;
	this.effect.attachTo( this );
	this.effect.size.x = 0;
	this.effect.size.y = 0;
	this.effect.update = function( deltaTime ) {
		ParticleSystem.prototype.update.call( this, deltaTime );

		var i = this.particles.length;
		while( i-- )
		{
			var p = this.particles[i];
			p.velocity.y += viewport.height * 0.02;
			
			if( p.position.y > viewport.height ) {
				p.velocity.y = 0;
			}

			if( p.remainingLife <= 0 ) {
				this.particles.splice( this.particles.indexOf(i), 1 );
			}
		}
	};
	this.effect.start = function( ) {
		this.started = true;
		for( var i = 0; i < this.count; i++ )
		{
			this.particles.push( new Particle( this ) );
		}
	};

	for( var i = 0; i < this.effect.minLife; i++ ) {
		this.effect.update( 1 / 60 );
	}
}

BloodballProjectile.prototype = new Projectile;
BloodballProjectile.prototype.constructor = BloodballProjectile;

BloodballProjectile.prototype.draw = function( context ) {
	Projectile.prototype.draw.call( this, context );

	if( this.effect ) {
		this.effect.draw( context );
	}
};

BloodballProjectile.prototype.update = function( deltaTime ) {
	Projectile.prototype.update.call( this, deltaTime );

	this.size.y = (Math.sin( app.gameTime / 330 ) * 0.2 + 0.9) * this.size.x;

	if( this.effect ) {
		this.effect.update( deltaTime );
	}
}