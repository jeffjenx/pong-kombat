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

	if( !this.dismantleAnimationFrames ) {
		this.dismantleAnimationFrames = [
			// end = start?? call only once, end < 0?? call indefinitely
			{ start : 1.0, end : 1.0, action : function(winner) { winner.shootProjectile(); } },
			{ start : 1.0, end : 1.5, action : function(winner) { winner.moveUp(); } },
			{ start : 1.25, end : 1.25, action : function(winner) { winner.shootProjectile(); } },
			{ start : 1.5, end : 1.5, action : function(winner) { winner.shootProjectile(); } },
			{ start : 1.5, end : 2.5, action : function(winner) { winner.moveDown(); } },
			{ start : 1.75, end : 1.75, action : function(winner) { winner.shootProjectile(); } },
			{ start : 2.0, end : 2.0, action : function(winner) { winner.shootProjectile(); } },
			{ start : 2.25, end : 2.25, action : function(winner) { winner.shootProjectile(); } },
			{ start : 2.5, end : 2.5, action : function(winner) { winner.shootProjectile(); } },
			{ start : 2.5, end : 3.0, action : function(winner) { winner.moveUp(); } },
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

	for( var i = 0; i < this.dismantleAnimationFrames.length; i++ ) {
		var frame = this.dismantleAnimationFrames[i];
		if( sceneTime >= frame.start ) {
			if( frame.start === frame.end ) {
				// called once
				frame.action( this, opponent.paddle );
				this.dismantleAnimationFrames.splice(i, 1);
				--i;
			}
			else if( frame.end < 0 || sceneTime <= frame.end ) {
				var percentComplete = ( frame.end > frame.start ) ? (sceneTime - frame.start) / (frame.end - frame.start) : 0;
				frame['action']( this, opponent.paddle, percentComplete );
			}
		}
	}
	
	/*
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
	*/
};

YellowPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
	this.effect.draw( context );
};

YellowPaddle.prototype.shootProjectile = function( ) {
	var projectile = new FireballProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile );
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	// this.projectile = new FireballProjectile( this );
	// this.projectile.sourcePaddle = this;
	// this.projectile.position.x = this.position.x;
	// this.projectile.position.y = this.position.y;
	
	// this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	// this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	// if( this.position.x > viewport.width * 0.50 )
	// {
	// 	this.projectile.velocity.x *= -1;
	// }
	
	// if( this.projectile.effect ) {
	// 	this.projectile.effect.minVelocity.x += this.projectile.velocity.x / 2;
	// 	this.projectile.effect.maxVelocity.x += this.projectile.velocity.x / 2;
	// 	this.projectile.effect.minVelocity.y += this.projectile.velocity.y / 2;
	// 	this.projectile.effect.maxVelocity.y += this.projectile.velocity.y / 2;
	// }
};

YellowPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );
	this.effect.update( deltaTime );
};