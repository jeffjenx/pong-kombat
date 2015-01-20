function MystPaddle( ) {
	this.color = new Color( 115, 140, 150 );
	this.enum = "MYST"
	this.name = "Myst";
	this.bigness = 3.00;
	this.quickness = 3.00;
	
	this.projectileSequence = [ Buttons.DOWN, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.DOWN, Buttons.RIGHT, Buttons.LEFT, Buttons.ACTION ];
	
	this.endStory = "After reaching the top of Pong Lao Tournament, Myst decides that combat is a senseless act of rage. After renouncing their throne, they set forth on an adventure to explore uncharted islands in hopes of solving an ancient puzzle.";
	this.story = "Little is known about the mystical paddle known as, uhhh, Myst. One minute they're here, and the next minute their gone. Seems like they show up when you least expect them to. And, why are they always yelling?";
	
	Paddle.call( this, 'Paddle-Myst' );
	this.icon = Resources['Paddle-Icon-Myst'];
	this.broken = Resources['Paddle-Broken-Myst'];
	this.opacity = 0.33;
	//this.gloss.opacity = 0.33;

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Smoke2'],Resources['Particle-Smoke2']];
	this.effect.count = 50;
	this.effect.minVelocity.x = -this.size.x * 0.1;
	this.effect.minVelocity.y = -this.size.y * 0.1;
	this.effect.maxVelocity.x = this.size.x * 0.1;
	this.effect.maxVelocity.y = this.size.y * 0.1;
	this.effect.minParticleSize = this.size.x * 0.3;
	this.effect.maxParticleSize = this.size.x * 0.5;
	this.effect.minLife = 50;
	this.effect.maxLife = 100;
	this.effect.maxOpacity = 0.4;
	this.effect.rotationSpeed = 1;
	this.effect.scaleSpeed = 2;
	this.effect.attachTo( this );

	this.nameSound = new Sound( 'Myst' );
	this.spraySound = new Sound( 'Spray' );

	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 4.0, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 7.0, end : 8.0, action : function(winner, loser, percentComplete) {
			if( !winner.flySwatter ) {
				winner.flySwatter = new Sprite( 'Fly-Swatter' );
				winner.flySwatter.size.y = viewport.height * 0.3;
				winner.flySwatter.size.x = winner.flySwatter.size.y;
				winner.flySwatter.position.x = Math.random() * viewport.width;
				winner.flySwatter.position.y = viewport.height + winner.flySwatter.size.y * winner.flySwatter.scale;
			}

			winner.flySwatter.position.y = viewport.width * 0.5 + viewport.width * 0.5 * percentComplete;
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

MystPaddle.prototype = new Paddle;
MystPaddle.prototype.constructor = MystPaddle;

MystPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

MystPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
};


MystPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	this.projectile = new FingerProjectile( this );
	this.projectile.sourcePaddle = this;
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		this.projectile.velocity.x *= -1;
	}

	if( app.settings.SOUND_FX > 0 ) {
		this.spraySound.stop();
		this.spraySound.play();
	}

};

MystPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );

	//if( this.effect ) {
	//	this.effect.update( deltaTime );	
	//}
};