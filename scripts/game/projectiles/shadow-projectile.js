function ShadowProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Shadow' );
	
	this.sourcePaddle = sourcePaddle;
	this.size.x = sourcePaddle.size.x * sourcePaddle.scale;
	this.size.y = sourcePaddle.size.y * sourcePaddle.scale;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.scale = 0;
	this.rotate = false;

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-BlackSmoke1'],Resources['Particle-BlackSmoke2']];
	this.effect.count = 100;
	this.effect.minVelocity.x = this.size.x * 0.25;
	this.effect.minVelocity.y = -this.size.y * 0.25;
	this.effect.maxVelocity.x = this.size.x * 0.5;
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
	this.effect.compositeOperation = 'multiply';
	this.effect.attachTo( this );

	for( var i = 0; i < this.effect.maxLife; i++ ) {
		this.effect.update( 1/60 );
	}
}

ShadowProjectile.prototype = new Projectile;
ShadowProjectile.prototype.constructor = ShadowProjectile;

ShadowProjectile.prototype.draw = function( context ) {
	var width = this.size.x * this.scale;
	var height = this.size.y * this.scale;
	var x = -width * this.registration.x;
	var y = -height * this.registration.y;
	var radius = width * 0.50;

	context.save();
	context.globalAlpha *= this.opacity * 0.75;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	context.beginPath();
	context.moveTo(x + radius, y);
	context.lineTo(x + width - radius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + radius);
	context.lineTo(x + width, y + height - radius);
	context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	context.lineTo(x + radius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - radius);
	context.lineTo(x, y + radius);
	context.quadraticCurveTo(x, y, x + radius, y);
	context.closePath();
	context.clip();

	//Sprite.prototype.draw.call( this, context );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	
	context.drawImage( this.sourcePaddle.image, -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.y * this.scale, this.size.y * this.scale );
	
	context.globalAlpha *= this.opacity * 0.5;
	context.drawImage( this.image, -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );

	context.restore();

	if( this.effect ) {
		this.effect.draw( context );
	}
};