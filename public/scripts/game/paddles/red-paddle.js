function RedPaddle( ) {
	this.color = new Color( 255, 0, 0 );
	this.enum = "RED"
	this.name = "Red Paddle";
	this.bigness = 2.00;
	this.quickness = 2.50;
	
	this.projectileSequence = [ Buttons.LEFT, Buttons.RIGHT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.RIGHT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];

	this.endStory = "red end story";
	this.story = "red story";
	
	Paddle.call( this, 'Paddle-Red' );
	
	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-BlackSmoke1'],Resources['Particle-BlackSmoke2']];
	this.effect.count = 5;
	this.effect.minVelocity.x = -this.size.x * 0.25;
	this.effect.minVelocity.y = this.size.y * 0.25;
	this.effect.maxVelocity.x = this.size.x * 0.25;
	this.effect.maxVelocity.y = -this.size.y * 0.25;
	this.effect.minParticleSize = this.size.x * 0.3;
	this.effect.maxParticleSize = this.size.x * 0.5;
	this.effect.minLife = 50;
	this.effect.maxLife = 150;
	this.effect.maxOpacity = 0.8;
	this.effect.rotationSpeed = 1;
	this.effect.scaleSpeed = 5;
	this.effect.compositeOperation = 'darker';
}

RedPaddle.prototype = new Paddle;
RedPaddle.prototype.constructor = RedPaddle;

RedPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

RedPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
	this.effect.draw( context );
};


RedPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;
	this.projectile = new ShadowProjectile( this );
	this.projectile.sourcePaddle = this;
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;
	this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		this.projectile.velocity.x *= -1;
		this.projectile.flipH = true;
	}
};

RedPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );
	
	this.effect.position = this.position;
	this.effect.rotation = this.rotation;
	this.effect.size.x = this.size.x * this.scale;
	this.effect.size.y = this.size.y * this.scale;
	this.effect.scale = this.scale;
	this.effect.update( deltaTime );
};