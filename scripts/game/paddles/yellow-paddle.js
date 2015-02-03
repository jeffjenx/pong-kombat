function YellowPaddle( ) {
	this.color = new Color( 255, 255, 0 );
	this.enum = "YELLOW"
	this.name = "Yellow Paddle";
	this.bigness = 3.00;
	this.quickness = 3.00;
	
	this.projectileSequence = [ Buttons.LEFT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.DOWN, Buttons.RIGHT, Buttons.UP, Buttons.ACTION ];
	
	this.endStory = "With great power comes great responsibility, and Yellow Paddle has neither. Despite their conquering of White Paddle, Yellow Paddle goes on an alcoholic binge, drinking themself into oblivion.";
	this.story = "Yellow Paddle is the only entrant to be personally selected by White Paddle to enter the tournament. White Paddle knows of their weak mind and the troubled past that they've endured.";
	
	Paddle.call( this, 'Paddle-Yellow' );
	this.icon = Resources['Paddle-Icon-Yellow'];
	this.broken = Resources['Paddle-Broken-Yellow'];

	this.effect = new ParticleSystem( );
	this.effect.particleImages = [Resources['Particle-Fire1'],Resources['Particle-Fire2'],Resources['Particle-Fire3']];
	this.effect.count = 100;
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
	
	this.nameSound = new Sound( 'Yellow-Paddle' );
	this.nameSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);

	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action : function(winner) { winner.shootProjectile(); } },
		{ start : 1.0, end : 1.5, action : function(winner) { winner.moveUp(); winner.velocity.y *= 0.5; } },
		{ start : 1.25, end : 1.25, action : function(winner) { winner.shootProjectile(); } },
		{ start : 1.5, end : 1.5, action : function(winner) { winner.shootProjectile(); } },
		{ start : 1.5, end : 2.5, action : function(winner) { winner.moveDown(); winner.velocity.y *= 0.5; } },
		{ start : 1.75, end : 1.75, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.0, end : 2.0, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.25, end : 2.25, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.5, end : 2.5, action : function(winner) { winner.shootProjectile(); } },
		{ start : 2.5, end : 3.0, action : function(winner) { winner.moveUp(); winner.velocity.y *= 0.5; } },
		{ start : 2.75, end : 2.75, action : function(winner) { winner.shootProjectile(); } },
		{ start : 3.0, end : 3.0, action : function(winner) { winner.shootProjectile(); } },
		{
		  start : 3.0, end :  -1, action : function(winner) {
				if(winner.position.y != viewport.height / 2) {
					winner.moveDown();
				}
				if( winner.position.y > viewport.height / 2) {
					winner.position.y = viewport.height / 2;
					winner.velocity.y = 0;
				}
			}
		},
		{ start : 5.0, end : 8.0, action : function(winner, loser, percentComplete) { loser.dismantleBurning(percentComplete); } },
		{ start : 6.0, end : 9.0, action : function(winner, loser, percentComplete) { loser.dismantleCharring(percentComplete); } },
		{ start : 10.0, end :  -1, action : function(winner, loser) { loser.dismantleCharred(); } },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

YellowPaddle.prototype = new Paddle;
YellowPaddle.prototype.constructor = YellowPaddle;

YellowPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
};

YellowPaddle.prototype.shootProjectile = function( ) {
	var projectile = new FireballProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile );

	projectile.effect.minVelocity.x += projectile.velocity.x * 0.6;
	projectile.effect.maxVelocity.x += projectile.velocity.x * 0.6;
	projectile.effect.minVelocity.y += projectile.velocity.y * 0.3;
	projectile.effect.maxVelocity.y += projectile.velocity.y * 0.3;

	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Whoosh-1' );
		projectile.sound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
		projectile.sound.play();
	}
};