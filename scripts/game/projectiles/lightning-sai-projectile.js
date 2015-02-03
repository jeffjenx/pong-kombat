function LightningSaiProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Lightning-Sai' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.15;
	this.size.y = this.size.x * 0.5;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
	this.rotate = false;

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Lightning1'],Resources['Particle-Lightning2'],Resources['Particle-Lightning3']];
	this.effect.count = 50;
	this.effect.minVelocity.x = 0;
	this.effect.minVelocity.y = 0;
	this.effect.maxVelocity.x = 0;
	this.effect.maxVelocity.y = 0;
	this.effect.minParticleSize = this.size.y * 0.2;
	this.effect.maxParticleSize = this.size.y * 0.5;
	this.effect.minLife = 40;
	this.effect.maxLife = 200;
	this.effect.maxOpacity = 0.7;
	this.effect.rotationSpeed = 0;
	this.effect.scaleSpeed = 0;
	this.effect.fadeSpeed = 0.65;
	this.effect.attachTo( this );
	this.effect.size.y = this.size.y * 0.5;
	
	this.effect.draw = function( context ) {
		context.save( );
		context.globalCompositeOperation = this.compositeOperation;
		
		for(var i = 0; i < this.particles.length; i++)
		{
			var p = this.particles[i];
			
			context.save();
			context.globalAlpha = p.opacity;
			if( this.attachedObject ) {
				context.translate( this.attachedObject.position.x + p.position.x - p.startPosition.x, this.attachedObject.position.y + p.position.y - p.startPosition.y );
			} else {
				context.translate( this.position.x + p.position.x - p.startPosition.x, this.position.y + p.position.y - p.startPosition.y );
			}
			context.rotate( p.rotation );
			context.drawImage( p.image, -p.radius * p.scale, -p.radius * p.scale, p.radius * 2 * p.scale, p.radius * 2 * p.scale );
			context.restore();
		}
		context.restore( );
	};

	for( var i = 0; i < this.effect.maxLife; i++ ) {
		this.effect.update( 1 / 60 );
	}
}

LightningSaiProjectile.prototype = new Projectile;
LightningSaiProjectile.prototype.constructor = LightningSaiProjectile;

LightningSaiProjectile.prototype.draw = function( context ) {
	Sprite.prototype.draw.call( this, context );
	if( this.effect ) {
		this.effect.draw( context );	
	}
};