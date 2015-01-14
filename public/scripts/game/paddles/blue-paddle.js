function BluePaddle( ) {
	this.color = new Color( 33, 90, 255 );
	this.enum = "BLUE";
	this.name = "Blue Paddle";
	this.bigness = 3.00;
	this.quickness = 3.00;
	
	this.projectileSequence = [ Buttons.LEFT, Buttons.DOWN, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.LEFT, Buttons.RIGHT, Buttons.DOWN, Buttons.ACTION ];
	
	this.endStory = "Shortly after their victory, Blue Paddle decides that the Pong Lao Tournament would make for an interesting video game. They spend entirely too much time making the game work with 3D television sets, and go bankrupt when the technology fails to succeed.";
	this.story = "Blue Paddle spends their days (and nights) alone behind the glow of a computer screen. After noticing a registration form for the tournament on Reddit, they decide to enter and attempt to prove they are more than just another nobody.";
	
	Paddle.call( this, 'Paddle-Blue' );
	
	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Smoke1'],Resources['Particle-Smoke2']];
	this.effect.count = 20;
	this.effect.minVelocity.x = -this.size.x * 0.25;
	this.effect.minVelocity.y = this.size.y * 0.25;
	this.effect.maxVelocity.x = this.size.x * 0.25;
	this.effect.maxVelocity.y = -this.size.y * 0.25;
	this.effect.minParticleSize = this.size.x * 0.3;
	this.effect.maxParticleSize = this.size.x * 0.5;
	this.effect.minLife = 50;
	this.effect.maxLife = 200;
	this.effect.maxOpacity = 0.4;
	this.effect.rotationSpeed = 1;
	this.effect.scaleSpeed = 5;
	this.effect.attachTo( this );

	//for( var i = 0; i < this.effect.maxLife; i++ ) {
	//	this.effect.update( 1 / 60 );
	//}
}

BluePaddle.prototype = new Paddle;
BluePaddle.prototype.constructor = BluePaddle;

BluePaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

BluePaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
	this.effect.draw( context );
};

BluePaddle.prototype.shootProjectile = function( ) {
	Paddle.prototype.shootProjectile.call( this, new IceBlastProjectile( this ) );
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;


	// this.projectile = new IceBlastProjectile( this );
	// this.projectile.sourcePaddle = this;
	// this.projectile.position.x = this.position.x;
	// this.projectile.position.y = this.position.y;
	
	// this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	// this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	// if( this.position.x > viewport.width * 0.50 )
	// {
	// 	this.projectile.velocity.x *= -1;
	// }
	
	/*
	if( this.position.x < viewport.width * 0.50 ) {
		this.projectile.velocity.x = viewport.width * 0.25;
	} else {
		this.projectile.velocity.x = -viewport.width * 0.25;
	}
	*/

	// if( this.projectile.effect ) {
	// 	this.projectile.effect.minVelocity.x += this.projectile.velocity.x / 2;
	// 	this.projectile.effect.maxVelocity.x += this.projectile.velocity.x / 2;
	// 	this.projectile.effect.minVelocity.y += this.projectile.velocity.y / 2;
	// 	this.projectile.effect.maxVelocity.y += this.projectile.velocity.y / 2;
	// }
};

BluePaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	
	/*
	this.offset += 0.11 * deltaTime;
	if( this.offset > 1 ) {
		this.offset = 0;
	}
	*/

	this.effect.update( deltaTime );	
};