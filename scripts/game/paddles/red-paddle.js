function RedPaddle( ) {
	this.color = new Color( 255, 0, 0 );
	this.enum = "RED"
	this.name = "Red Paddle";
	this.bigness = 2.00;
	this.quickness = 2.50;
	
	this.projectileSequence = [ Buttons.LEFT, Buttons.RIGHT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.RIGHT, Buttons.LEFT, Buttons.RIGHT, Buttons.ACTION ];

	this.endStory = "The triumphant defeat of White Paddle indeed intrigues film director Quentiño, who enlists Red Paddle in his next major project. A tragic boating accident, however, leaves Red Paddle warped and misshapen. They leave the film industry, aspiring to be a super-villain.";
	this.story = "Although they have yet to see the fame that comes with it, Red Paddle has a satisfying career as a movie star. They hope to catch the eye of notable director, Trent Quentiño, with an underdog victory in the tournament.";
	
	Paddle.call( this, 'Paddle-Red' );
	this.icon = Resources['Paddle-Icon-Red'];
	this.broken = Resources['Paddle-Broken-Red'];
	
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
	this.effect.attachTo( this );

	this.nameSound = new Sound( 'Red-Paddle' );
	this.nameSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
	//this.whooshSound = new Sound( 'Whoosh-3' );

	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action: function() {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );
			}
		} },
		{ start : 1.0, end : 4.0, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 2.0, end : 4.5, action: function(winner, loser, percentComplete) { loser.dismantleMeanderToMiddle(percentComplete); } },
		
		{ start : 6.0, end : 6.0, action: function() {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );
			}
		} },
		{ start : 6.0, end : 6.2, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 6.1, end : 6.1, action : function(winner,loser){ loser.getHit(); } },
		{ start : 6.3, end :  7.3, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 6.3, end : 6.3, action: function() {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );
			}
		} },
		
		{ start : 8.0, end : 8.0, action: function() {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );
			}
		} },
		{ start : 8.0, end : 8.2, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 8.1, end : 8.1, action : function(winner,loser){ loser.getHit(); } },
		{ start : 8.3, end : 9.3, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 8.3, end : 8.3, action: function() {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );
			}
		} },
		
		{ start : 10.0, end : 10.0, action: function() {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );
			}
		} },
		{ start : 10.0, end : 10.2, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 10.1, end : 10.1, action : function(winner,loser){ loser.getHit(); } },
		{ start : 10.3, end : 13.3, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 10.3, end : 10.3, action: function(winner,loser) {
			if( app.settings.SOUND_FX > 0 ) {
				var poofSound = new Sound( 'Poof' );
				poofSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
				poofSound.play( );

				loser.screamSound.play();
			}
		} },
		
		{ start : 10.2, end : 15.0, action : function(winner, loser) {loser.dismantleFallToBottom();} },
		
		{ start : 14.0, end : 14.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
		/*
		{ start : 11.0, end : 12.25, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 11.5, end : 11.5, action : function(winner,loser){loser.getHit();} },
		{ start : 12.0, end :  13.5, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 14.5, end : 15.75, action : function(winner, loser, percentComplete) { winner.dismantleAppear(); } },
		{ start : 16.0, end : 16.0, action : function(winner,loser){loser.getHit();} },
		{ start : 16.5, end : 19.5, action : function(winner, loser, percentComplete) { winner.dismantleVanish(percentComplete); } },
		{ start : 20.0, end : 20.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
		*/
	];
}

RedPaddle.prototype = new Paddle;
RedPaddle.prototype.constructor = RedPaddle;

/*
RedPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};
*/

RedPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );
};


RedPaddle.prototype.shootProjectile = function( ) {
	var projectile = new ShadowProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile );
	
	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Whoosh-3' );
		projectile.sound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
		projectile.sound.play();
	}


	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;
	
	// this.projectile = new ShadowProjectile( this );
	// this.projectile.sourcePaddle = this;
	// this.projectile.position.x = this.position.x;
	// this.projectile.position.y = this.position.y;
	
	// this.projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;
	// this.projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;
	
	// if( this.position.x > viewport.width * 0.50 )
	// {
	// 	this.projectile.velocity.x *= -1;
	// 	this.projectile.flipH = true;
	// }
};

RedPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	//this.velocity = this.velocity.multiply( 0.9 );
	
	/*
	this.effect.position = this.position;
	this.effect.rotation = this.rotation;
	this.effect.size.x = this.size.x * this.scale;
	this.effect.size.y = this.size.y * this.scale;
	this.effect.scale = this.scale;
	this.effect.update( deltaTime );
	*/
};