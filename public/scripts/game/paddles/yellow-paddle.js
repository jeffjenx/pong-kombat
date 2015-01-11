function YellowPaddle( ) {
	this.color = new Color( 255, 255, 0 );
	this.enum = "YELLOW"
	this.name = "Yellow Paddle";
	this.bigness = 3.00;
	this.quickness = 3.00;

	this.projectileSequence = [ Buttons.LEFT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.DOWN, Buttons.RIGHT, Buttons.UP, Buttons.ACTION ];
	
	this.endStory = "yellow end story";
	this.story = "yellow story";
	
	Paddle.call( this, 'Paddle-Yellow' );
	
	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Fire1'],Resources['Particle-Fire2'],Resources['Particle-Fire3']];
	this.effect.count = 250;
	this.effect.minVelocity.x = -this.size.x;
	this.effect.minVelocity.y = 0;
	this.effect.maxVelocity.x = this.size.x;
	this.effect.maxVelocity.y = -this.size.y;
	this.effect.minParticleSize = this.size.x * 0.1;
	this.effect.maxParticleSize = this.size.x * 0.3;
	this.effect.minLife = 50;
	this.effect.maxLife = 100;
	this.effect.rotationSpeed = 5;
	this.effect.scaleSpeed = 5;
	this.effect.maxOpacity = 0.9;
	this.effect.fadeSpeed = 0.666;
	this.effect.attachTo( this );
	this.effect.size.x = this.size.x * this.scale;
	this.effect.size.y = this.size.y * this.scale;
	//this.effect.start( );
}

YellowPaddle.prototype = new Paddle;
YellowPaddle.prototype.constructor = YellowPaddle;

YellowPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

YellowPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
	this.effect.draw( context );
};

YellowPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	this.projectile = new FireballProjectile( this );
	this.projectile.sourcePaddle = this;
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		this.projectile.velocity.x *= -1;
	}
	
	if( this.projectile.effect ) {
		this.projectile.effect.minVelocity.x += this.projectile.velocity.x / 2;
		this.projectile.effect.maxVelocity.x += this.projectile.velocity.x / 2;
		this.projectile.effect.minVelocity.y += this.projectile.velocity.y / 2;
		this.projectile.effect.maxVelocity.y += this.projectile.velocity.y / 2;
	}
};

YellowPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );
	this.effect.update( deltaTime );
};