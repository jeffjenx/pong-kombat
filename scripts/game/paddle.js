var Paddles = {
	RANDOM   : 0,
	CUSTOM   : 1,
	
	BLUE     : 2,
	GREEN    : 3,
	PURPLE   : 4,
	RED      : 5,
	YELLOW   : 6,
	
	SHIFTER  : 7,
	MONOLITH : 8,
	WHITE    : 9,
	MRSLAYER : 10,
	MYST     : 11
};

function Paddle( texture ) {
	Sprite.call( this, texture );
	
	if( !this.bigness ) {
		this.bigness = 3;
	}
	
	if( !this.quickness ) {
		this.quickness = 3;
	}
	
	this.gloss = new Sprite( 'Paddle-Gloss' );
	this.gloss.noClip = false; // prevent clipping to paddle shape (for Dismantles)

	this.icon = Resources['Paddle-Icon-Unknown'];
	this.broken = Resources['Paddle-Broken-Shifter'];
	this.drag = 0.95;
	this.lifeModifier = 1;
	
	this.patternCanvas = document.createElement( 'canvas' );
	this.patternCanvas.width = ( this.image ) ? this.image.width : 512;
	this.patternCanvas.height = ( this.image ) ? this.image.height : 512;
	this.patternContext = this.patternCanvas.getContext( '2d' );
	
	this.offset = 0.5;
	this.size.x = viewport.width * 0.03;
	//this.size.y = viewport.height * 0.2;
	this.size.y = viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ); 
	
	// Bigness Scale (size.y)
	// 2.0 ~ .12
	// 2.5 ~ .135
	// 3.0 ~ .15
	// 3.5 ~ .175
	// 4.0 ~ .20
	// 4.5 ~ .225
	// 5.0 ~ .25
	
	// Quickness Scale (velocity.y)
	// 2.0 ~ 
	// 2.5 ~ 
	// 3.0 ~ 
	// 3.5 ~ 
	// 4.0 ~ 
	// 4.5 ~ 
	// 5.0 ~ 
	
	this.shieldPowerup = false;
	this.speedPowerup = false;
	this.gluePowerup = false;
	this.timePowerup = false;

	this.glue = null;
	this.shield = null;
	//this.projectile = null;
	//this.bloodEffect = null;

	this.maxProjectiles = 1;
	this.projectiles = [ ];

	this.maxBloods = 5;
	this.bloods = [ ];

	this.effect = new ParticleSystem();

	this.gruntSounds = [];
	this.gruntSounds.push( new Sound( 'Grunt-1' ) );
	this.gruntSounds.push( new Sound( 'Grunt-2' ) );
	this.gruntSounds.push( new Sound( 'Grunt-3' ) );
	
	this.hitSounds = [];
	this.hitSounds.push( new Sound( 'Kick-1' ) );
	this.hitSounds.push( new Sound( 'Kick-2' ) );
	this.hitSounds.push( new Sound( 'Kick-3' ) );
	this.hitSounds.push( new Sound( 'Punch-1' ) );
	this.hitSounds.push( new Sound( 'Punch-2' ) );
	this.hitSounds.push( new Sound( 'Punch-3' ) );
	this.hitSounds.push( new Sound( 'Punch-4' ) );
	
	this.screamSound = new Sound( 'Scream' );
	this.absorbSound = new Sound( 'Shield-Absorb' );
	
	this.dismantleAnimationFrames = null;
}

Paddle.prototype = new Sprite;
Paddle.prototype.constructor = Paddle;

Paddle.prototype.canShootProjectile = function( ) {
	return app.settings.COMBAT && this.projectiles.length < this.maxProjectiles;
	//return app.settings.COMBAT && this.projectile === null;
};

Paddle.prototype.blockProjectile = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.absorbSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);
		this.absorbSound.play();
	}
};

Paddle.prototype.dismantle = function( opponent ) {
	if( !this.dismantleAnimationFrames ) {
		return;
	}

	var sceneTime = SceneManager.currentScene.stateTime;

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
};

Paddle.prototype.dismantleBloat = function() {
	this.targetSize = this.size.x * 1.5;
	//this.size.x *= 1.5;
};

Paddle.prototype.dismantleBurning = function(percentComplete) {
	if( this.effect.type !== 'burning' ) {
		this.effect.type = 'burning';
		this.effect.particleImages = [Resources['Particle-Fire1'],Resources['Particle-Fire2'],Resources['Particle-Fire3']];
		this.effect.count = 420;
		this.effect.minVelocity.x = -this.size.x;
		this.effect.minVelocity.y = 0;
		this.effect.maxVelocity.x = this.size.x;
		this.effect.maxVelocity.y = -this.size.y;
		this.effect.minParticleSize = this.size.x * 0.1;
		this.effect.maxParticleSize = this.size.x * 0.3;
		this.effect.minLife = 10;
		this.effect.maxLife = 50;
		this.effect.rotationSpeed = 5;
		this.effect.scaleSpeed = 5;
		this.effect.maxOpacity = 0.9;
		this.effect.fadeSpeed = 0.666;
		this.effect.attachTo( this );

		this.effect.restart();
	}

	this.gloss.opacity = 1 - percentComplete;
	
	this.effect.update( 1/60 );

	if( app.settings.SOUND_FX > 0 && !this.screamSound.started && percentComplete > 0.75 ) {
		this.screamSound.play();
	}
};
Paddle.prototype.dismantleCharring = function(percentComplete) {
	this.gloss = new Sprite( 'Black' );
	this.gloss.opacity = percentComplete;
	this.effect.count = Math.max( 420 * (1 - percentComplete), 1 );
};

Paddle.prototype.dismantleCharred = function() {
	if( this.effect.type !== 'charred' ) {
		this.effect.type = 'charred';
		this.effect.particleImages = [Resources['Black']];
		this.effect.compositeOperation = 'normal';
		this.effect.count = 500;
		this.effect.minVelocity.x = -this.size.x;
		this.effect.minVelocity.y = viewport.height * 0.25;
		this.effect.maxVelocity.x = this.size.x;
		this.effect.maxVelocity.y = viewport.height * 0.25;
		this.effect.minParticleSize = this.size.x * 0.05;
		this.effect.maxParticleSize = this.size.x * 0.1;
		this.effect.minLife = 1;
		this.effect.maxLife = 1000;
		this.effect.rotationSpeed = 1;
		this.effect.scaleSpeed = 0;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;

		this.effect.restart();
		for( var i = 0; i < this.effect.maxLife; i++ ) {
			this.effect.update( 1/60 );	
		}
	}

	//this.opacity = Math.max( this.opacity - 0.005, 0 );
	this.size.y *= 0.99;
	this.scale = Math.max( this.scale - 0.005, 0 );

	if( this.scale <= 0 ) {
		this.effect.count -= 1;
	}
};

Paddle.prototype.dismantleElectricuting = function(percentComplete) {
	if( this.effect.type !== 'electricuting' ) {
		this.effect.type = 'electricuting';
		this.effect.particleImages = [Resources['Particle-Lightning1'],Resources['Particle-Lightning2'],Resources['Particle-Lightning3']];
		this.effect.count = 100;
		this.effect.minVelocity.x = 0;
		this.effect.minVelocity.y = 0;
		this.effect.maxVelocity.x = 0;
		this.effect.maxVelocity.y = 0;
		this.effect.minParticleSize = this.size.x * 0.4;
		this.effect.maxParticleSize = this.size.x * 0.8;
		this.effect.minLife = 40;
		this.effect.maxLife = 200;
		this.effect.maxOpacity = 0.7;
		this.effect.rotationSpeed = 0;
		this.effect.scaleSpeed = 0;
		this.effect.fadeSpeed = 0.65;

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
	}

	this.gloss.opacity = 1-percentComplete;
	
	this.effect.update( 1/60 );

	if( app.settings.SOUND_FX > 0 && percentComplete > 0.75 && !this.screamSound.started ) {
		this.screamSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);
		this.screamSound.play();
	}
};

Paddle.prototype.dismantleFreezing = function() {
	if( this.effect.type !== 'freezing' ) {
		this.effect.type = 'freezing';
		//this.effect.particles = [];
		this.effect.particleImages = [Resources['Projectile-Ice-Blast']];
		this.effect.count = 50;
		this.effect.minVelocity.x = 0;
		this.effect.minVelocity.y = 0;
		this.effect.maxVelocity.x = 0;
		this.effect.maxVelocity.y = 0;
		this.effect.minParticleSize = this.size.x * 0.4;
		this.effect.maxParticleSize = this.size.x * 0.6;
		this.effect.minLife = 1000;
		this.effect.maxLife = 1000;
		this.effect.rotationSpeed = 0;
		this.effect.scaleSpeed = 0.05;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.compositeOperation = 'normal';
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;

		this.effect.restart();
	}
	this.opacity = 0.5;
	this.effect.update( 1/60 );
};


Paddle.prototype.dismantleSplashing = function(resource) {
	if( this.effect.type !== 'splashing' ) {
		this.effect.type = 'splashing';
		//this.effect.particles = [];
		resource = resource || 'Projectile-Ice-Blast';
		this.effect.particleImages = [Resources[resource]];
		this.effect.count = 50;
		this.effect.minVelocity.x = -this.size.x * this.scale;
		this.effect.minVelocity.y = -this.size.x * this.scale;
		this.effect.maxVelocity.x = this.size.x * this.scale;
		this.effect.maxVelocity.y = this.size.x * this.scale;
		this.effect.minParticleSize = this.size.x * 0.4;
		this.effect.maxParticleSize = this.size.x * 0.6;
		this.effect.minLife = 50;
		this.effect.maxLife = 250;
		this.effect.rotationSpeed = 0;
		this.effect.scaleSpeed = 0.05;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.compositeOperation = 'normal';
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;
		this.effect.singleCycle = true;
		this.effect.restart();

		if( app.settings.SOUND_FX > 0 ) {
			var splashSound = new Sound( 'Drips-1' );
			splashSound.setMaxVolume( 0.25 * app.settings.SOUND_FX / 11 );
			splashSound.play( );
		}
	}
	//this.opacity = 0.5;
	this.effect.update( 1/60 );
};

Paddle.prototype.dismantleRocked = function() {
	if( this.effect.type !== 'rocked' ) {
		this.effect.type = 'rocked';
		//this.effect.particles = [];
		this.effect.particleImages = [Resources['Paddle-Broken-Monolith']];
		this.effect.count = 5;
		this.effect.minVelocity.x = 0;
		this.effect.minVelocity.y = 0;
		this.effect.maxVelocity.x = 0;
		this.effect.maxVelocity.y = 0;
		this.effect.minParticleSize = this.size.x * 0.4;
		this.effect.maxParticleSize = this.size.x * 0.6;
		this.effect.minLife = 1000;
		this.effect.maxLife = 1000;
		this.effect.rotationSpeed = 0;
		this.effect.scaleSpeed = 0.05;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.compositeOperation = 'normal';
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale * 2;
		this.effect.size.y = this.size.y * this.scale * 1.25;

		this.effect.restart();
	}

	if( this.effect.count < 50 ) {
		this.effect.count += 5;
		this.effect.restart();
	}

	this.opacity = 0.5;
	this.effect.update( 1/60 );
};

Paddle.prototype.dismantleExploding = function( percentComplete ) {
	if( this.effect.type !== 'exploding' ) {
		switch( this.effect.type ) {
			case 'freezing' :
				this.effect.particleImages = [Resources['Projectile-Ice-Blast'], this.broken];
			break;
			default :
				this.effect.particleImages = [this.broken];
		}
		this.effect.type = 'exploding';
		this.opacity = 0;
		this.getHit( );

		//this.effect.particleImages = [Resources['Projectile-Ice-Blast']];
		this.effect.count = 40;
		this.effect.minVelocity.x = -viewport.width * 0.03 * 5;
		this.effect.minVelocity.y = -viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) * 2;
		this.effect.maxVelocity.x = viewport.width * 0.03 * 5;
		this.effect.maxVelocity.y = -viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) * 4;
		this.effect.minParticleSize = viewport.width * 0.03 * 0.4;
		this.effect.maxParticleSize = viewport.width * 0.03 * 0.6;
		this.effect.minLife = 5000;
		this.effect.maxLife = 5000;
		this.effect.rotationSpeed = 0;
		this.effect.scaleSpeed = 0.05;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.compositeOperation = 'normal';
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;
		this.effect.update = function( deltaTime ) {
			ParticleSystem.prototype.update.call( this, deltaTime );

			var i = this.particles.length;
			while( i-- )
			{
				var p = this.particles[i];
				p.velocity.y += viewport.height * 0.02;
				
				var bottom = viewport.height;
				if( SceneManager.currentScene.layers['HUD'].components['LetterBox'] ) {
					bottom = SceneManager.currentScene.layers['HUD'].components['LetterBox'].boundingBox.top;
				}

				if( p.position.y > viewport.width || p.position.y < 0 ) {
					p.velocity.x = 0;
				}

				if( p.position.y > bottom ) {
					p.velocity.y *= -0.5;
					p.velocity.x *= 0.5;
				}

				if( p.remainingLife <= 0 ) {
					this.particles.splice( this.particles.indexOf(i), 1 );
				}
			}
		};
		this.effect.restart();
	}
	this.effect.update( 1/60 );
};

Paddle.prototype.dismantleFallToBottom = function() {
	var bottom = viewport.height;
	if( SceneManager.currentScene.layers['HUD'].components['LetterBox'] ) {
		bottom = SceneManager.currentScene.layers['HUD'].components['LetterBox'].boundingBox.top;
	}

	if( this.position.y >= bottom ) {
		if( this.velocity.y !== 0 ) {
			this.velocity.y = 0;
			if( app.settings.SOUND_FX > 0 ) {
				var thudSound = new Sound( 'Thud' );
				thudSound.setVolume( 0.75 * app.settings.SOUND_FX / 11 );
				thudSound.play();
			}
		}
		this.position.y = bottom;
	} else {
		this.velocity.y += viewport.height * 0.04;
		this.rotation += 3;

		if( this.rotation >= 90 ) {
			this.rotation = 90;
		}
	}
};

Paddle.prototype.dismantleMeanderToMiddle = function( percentComplete ) {
	if( this.position.x > viewport.width * 0.5 ) {
		this.position.x = viewport.width * 0.98 - viewport.width * 0.5 * 0.98 * percentComplete;
	} else {
		this.position.x = viewport.width * 0.02 + viewport.width * 0.5 * 0.98 * percentComplete;
	}
};

Paddle.prototype.dismantleStickToWall = function( ) {
	if( this.position.x > viewport.width * 0.5 ) {
		this.position.x = Math.min( this.position.x + viewport.width * 0.01, viewport.width );
	} else {
		this.position.x = Math.min( this.position.x - viewport.width * 0.01, 0 );
	}
};

Paddle.prototype.dismantleStruckByLightning = function( source ) {
	var lightningBolt = new Sprite( (Math.random() < 0.5) ? 'Paddle-Lightning-1' : 'Paddle-Lightning-2' );

	lightningBolt.flipH = (Math.random() < 0.5);
	lightningBolt.registration.x = 0;

	if( source ) {
		lightningBolt.position.x = source.position.x;
		lightningBolt.position.y = source.position.y;
		lightningBolt.rotation = Math.acos( this.position.dot( this.source ) / ( this.source.normalize() * this.position.normalize() ) );
	}
};

Paddle.prototype.dismantleVanish = function(percentComplete) {
	if( this.effect.type !== 'vanishing' ) {
		this.effect.type = 'vanishing';

		if( this.enum !== 'SHIFTER' ) {
			this.effect.particleImages = [Resources['Particle-Smoke2']];
			this.effect.count = 50;
			this.effect.minVelocity.x = -viewport.height * 0.05;
			this.effect.minVelocity.y = -viewport.height * 0.05;
			this.effect.maxVelocity.x = viewport.height * 0.05;
			this.effect.maxVelocity.y = viewport.height * 0.1;
			this.effect.minParticleSize = this.size.x * 0.7;
			this.effect.maxParticleSize = this.size.x;
			this.effect.minLife = 50;
			this.effect.maxLife = 50;
			this.effect.rotationSpeed = 0;
			this.effect.scaleSpeed = 0.1;
			this.effect.maxOpacity = 1;
			this.effect.fadeSpeed = 1;
			this.effect.compositeOperation = 'normal';
			this.effect.attachTo( this );
			this.effect.size.x = this.size.x * this.scale;
			this.effect.size.y = this.size.y * this.scale;
			this.effect.singleCycle = true;
			this.effect.restart();
		}
	}
	this.opacity = Math.max(1 - percentComplete * 5, 0);
};

Paddle.prototype.dismantleAppear = function(percentComplete) {
	if( this.effect.type !== 'appearing' ) {
		this.effect.type = 'appearing';

		this.position.y = viewport.height * 0.45 + Math.random() * viewport.height * 0.1;
		this.position.x = (Math.random() < 0.5) ? viewport.width * 0.60 : viewport.width * 0.40;
		this.opacity = 1;
		this.velocity.x = (this.position.x < viewport.width * 0.5) ? viewport.width * 0.8 : -viewport.width * 0.8;
		
		if( this.enum !== 'SHIFTER' ) {
			this.effect.particleImages = [Resources['Particle-Smoke2']];
			this.effect.count = 33;
			this.effect.minVelocity.x = -viewport.height * 0.05;
			this.effect.minVelocity.y = -viewport.height * 0.05;
			this.effect.maxVelocity.x = viewport.height * 0.05;
			this.effect.maxVelocity.y = viewport.height * 0.1;
			this.effect.minParticleSize = this.size.x * 0.7;
			this.effect.maxParticleSize = this.size.x;
			this.effect.minLife = 50;
			this.effect.maxLife = 50;
			this.effect.rotationSpeed = 0;
			this.effect.scaleSpeed = 0.1;
			this.effect.maxOpacity = 0.5;
			this.effect.fadeSpeed = 1;
			this.effect.compositeOperation = 'normal';
			this.effect.attachTo( this );
			this.effect.size.x = this.size.x * this.scale;
			this.effect.size.y = this.size.y * this.scale;
			this.effect.singleCycle = true;
			this.effect.restart();
		}
	}

	//if( percentComplete < 0.5 && this.opacity != 0 ) {
		//this.effect.restart();
		//this.opacity = 0;
	//}

	this.velocity.x /= this.drag;
};

Paddle.prototype.dismantleRockFalling = function( percentComplete ) {
	if( this.effect.type !== 'rockfalling' ) {
		this.effect.type = 'rockfalling';
		
		this.effect.minVelocity.x = -this.size.x;
		this.effect.minVelocity.y = -viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) * 2;
		this.effect.maxVelocity.x = this.size.x;
		this.effect.maxVelocity.y = -viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) * 4;
		this.effect.minParticleSize = viewport.width * 0.03 * 0.4;
		this.effect.maxParticleSize = viewport.width * 0.03 * 0.6;
		this.effect.minLife = 5000;
		this.effect.maxLife = 5000;
		this.effect.rotationSpeed = 0;
		this.effect.scaleSpeed = 0.05;
		this.effect.maxOpacity = 10;
		this.effect.fadeSpeed = 1;
		this.effect.compositeOperation = 'normal';
		this.effect.attachTo( this );
		this.effect.size.x = this.size.x * this.scale;
		this.effect.size.y = this.size.y * this.scale;
		this.effect.update = function( deltaTime ) {
			ParticleSystem.prototype.update.call( this, deltaTime );

			var i = this.particles.length;
			while( i-- )
			{
				var p = this.particles[i];
				if( p.velocity.y !== 0 || Math.random() < 0.25 ) {
					p.velocity.y += viewport.height * 0.005;
				}
				
				var bottom = viewport.height;
				if( SceneManager.currentScene.layers['HUD'].components['LetterBox'] ) {
					bottom = SceneManager.currentScene.layers['HUD'].components['LetterBox'].boundingBox.top;
				}

				if( p.position.y > viewport.width || p.position.y < 0 ) {
					p.velocity.x = 0;
				}

				if( p.position.y > bottom ) {
					p.velocity.y *= -0.5;
					p.velocity.x *= 0.5;
				}

				if( p.remainingLife <= 0 ) {
					this.particles.splice( this.particles.indexOf(i), 1 );
				}
			}
		};
		//this.effect.restart();
	}
	this.effect.update( 1/60 );
};

Paddle.prototype.dismantleCutInHalf = function(percentComplete) {
	if( !this.slicedHalf ) {
		this.slicedHalf = new Sprite( 'Paddle-Guts' );
		this.slicedHalf.position.x = this.position.x;
		this.slicedHalf.position.y = this.position.y;
		this.slicedHalf.size.x = this.size.x;
		this.slicedHalf.size.y = this.size.y;
		this.slicedHalf.scale = this.scale;
	}

	this.rotation = percentComplete * 90;
	this.velocity.y += viewport.height * 0.1;
	if( this.position.y > viewport.height * 0.8 ) {
		this.position.y = viewport.height * 0.8;
	}
};

Paddle.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, 0 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 2, this.patternCanvas.height * 2 );
	this.patternContext.restore( );
	
	var width = this.size.x * this.scale;
	var height = this.size.y * this.scale;
	var x = -width * this.registration.x;
	var y = -height * this.registration.y;
	var radius = width * 0.50;
	
	context.save();
	context.globalAlpha *= this.opacity;
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
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * this.registration.x,
		-height * this.registration.y,
		width,
		height
	);
	
	if( this.gloss.noClip ) {
		context.restore();

		context.save();
		context.globalAlpha *= this.opacity * this.gloss.opacity;
		context.translate( this.position.x, this.position.y );
		context.rotate( this.rotation * Math.TO_RADIANS );
	}
	//context.globalAlpha = this.gloss.opacity;
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 6.5,
		-height * this.registration.y * 1.15,
		width * 6.5,
		height * 1.15
	);
	context.restore();
	
	/*
	context.save();
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
	//context.restore();
	//context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( this.flipH )
	{
		context.scale( -1, 1 );
	}
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * this.registration.x,
		-height * this.registration.y,
		width,
		height
	);
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 7,
		-height * this.registration.y * 1.15,
		width * 7,
		height * 1.15
	);
	context.restore( );
	*/

	if( this.glue ) {
		this.glue.draw( context );
	}

	if( this.shield ) {
		this.shield.draw( context );
	}
	
	if( this.projectiles.length > 0 ) {
		for( var i = 0; i < this.projectiles.length; i++ ) {
			this.projectiles[i].draw( context );
		}
	}
	//if( this.projectile ) {
	//	this.projectile.draw( context );
	//}

	if( this.effect ) {
		this.effect.draw( context );
	}

	if( this.bloods.length > 0 ) {
		for( var i = 0; i < this.bloods.length; i++ ) {
			this.bloods[i].draw( context );
		}
	}
	// if( this.bloodEffect ) {
	// 	this.bloodEffect.draw( context );
	// }
};

Paddle.prototype.getHit = function( projectile ) {
	if( projectile ) {
		if( projectile.hitSomething )
		{
			return;
		}
		else
		{
			projectile.hitSomething = true;
		}
	}

	var blood = new ParticleSystem( );
	blood.particleImages = [Resources['Particle-Blood1'],Resources['Particle-Blood2']];
	blood.compositeOperation = 'normal';
	blood.count = 50;
	blood.minVelocity.x = -viewport.width * 0.03 * 2;
	blood.minVelocity.y = -viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 ) * 3;
	blood.maxVelocity.x = viewport.width * 0.03 * 2;
	blood.maxVelocity.y = -viewport.height * ( 0.01 * Math.pow( this.bigness, 2 ) + 0.09 );
	blood.minParticleSize = viewport.width * 0.03 * 0.2;
	blood.maxParticleSize = viewport.width * 0.03 * 0.4;
	blood.minLife = 1000;
	blood.maxLife = 1000;
	blood.rotationSpeed = 0;
	blood.scaleSpeed = 0.01;
	blood.maxOpacity = 50;
	blood.fadeSpeed = 0.9;
	blood.attachTo( this );
	blood.size.x = 0;
	blood.size.y = 0;
	blood.dripSound = new Sound( 'Drips-' + Math.ceil(Math.random()*3) );
	blood.dripSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
	blood.update = function( deltaTime ) {
		ParticleSystem.prototype.update.call( this, deltaTime );

		var i = this.particles.length;
		while( i-- )
		{
			var p = this.particles[i];
			p.velocity.y += viewport.height * 0.02;
			
			var bottom = viewport.height;
			if( SceneManager.currentScene.layers['HUD'].components['LetterBox'] ) {
				bottom = SceneManager.currentScene.layers['HUD'].components['LetterBox'].boundingBox.top;
			}

			if( p.position.y > bottom ) {
				p.velocity.y = 0;
				p.velocity.x *= 0.75;

				if( app.settings.SOUND_FX > 0 && !this.dripSound.started ) {
					this.dripSound.play();
				}
			}

			if( p.remainingLife <= 0 ) {
				this.particles.splice( this.particles.indexOf(i), 1 );
			}
		}
	};
	blood.start = function( ) {
		this.started = true;
		for( var i = 0; i < this.count; i++ )
		{
			this.particles.push( new Particle( this ) );
		}
	};
	blood.start();

	this.bloods.push( blood );
	if( this.bloods.length > this.maxBloods ) {
		this.bloods.shift();
	}

	if( app.settings.SOUND_FX > 0 )
	{
		var randomHitSound = this.hitSounds[ Math.floor(Math.random() * this.hitSounds.length) ];
		randomHitSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);
		randomHitSound.play();

		var randomGruntSound = this.gruntSounds[ Math.floor(Math.random() * this.gruntSounds.length) ];
		randomGruntSound.setMaxVolume(1 * app.settings.SOUND_FX / 11);
		randomGruntSound.play();
	}
};

Paddle.prototype.moveDown = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 2 : 1.5;

	this.offset = this.position.y / viewport.height * 0.75;
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) );
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.y = viewport.height * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.2 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.moveUp = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 2 : 1.5;

	this.offset = this.position.y / viewport.height * 0.75;
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) ); 
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.y = -viewport.height * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.2 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.moveLeft = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 2 : 1.5;

	//this.offset = this.position.y / viewport.height * 0.75;
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) ); 
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.x = -viewport.width * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.1 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.moveRight = function( ) {
	var speedMultiplier = ( this.speedPowerup ) ? 2 : 1.5;

	//this.offset = this.position.y / viewport.height * 0.75;	
	//this.offset = (Math.abs(this.position.x - viewport.width / 2) + this.position.y) / (viewport.width / 2 + viewport.height);
	
	//this.offset = Math.sqrt( Math.pow( this.position.y, 2 ) + Math.pow( this.position.x, 2 ) ); 
	//this.offset /= Math.sqrt( Math.pow( viewport.height, 2 ) + Math.pow( viewport.width / 2, 2 ) );

	this.velocity.x = viewport.width * ( 0.01 * Math.pow( this.quickness, 2 ) + 0.1 ) * speedMultiplier;
	this.restrictToBounds( );
};

Paddle.prototype.restrictToBounds = function( ) {
	var paddingBottom = viewport.height;
	var paddingTop = SceneManager.currentScene.layers['HUD'].components['HUD'].size.y;
	var paddingLeft = 0;
	var paddingRight = viewport.width * 0.5;
	
	if( ( this.velocity.y > 0 && this.boundingBox.bottom >= paddingBottom ) || ( this.velocity.y < 0 && this.boundingBox.top <= paddingTop ) )
	{
		this.velocity.y = 0;
	}

	if( ( this.velocity.x > 0 && this.boundingBox.right >= paddingRight ) || ( this.velocity.x < 0 && this.boundingBox.left <= paddingLeft ) )
	{
		this.velocity.x = 0;
	}
};

Paddle.prototype.shootHomingProjectile = function( projectile, target ) {
	//projectile.setTarget( target );
	//this.shootProjectile(projectile);
	//var homingProjectile = this.projectiles[this.projectiles.length-1];
};

Paddle.prototype.shootProjectile = function( projectile ) {
	if( !projectile ) {
		projectile = new Projectile( this );
	}
	projectile.position.x = this.position.x;
	projectile.position.y = this.position.y;
	
	projectile.velocity.x = Math.cos( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;
	projectile.velocity.y = Math.sin( this.rotation * Math.TO_RADIANS ) * viewport.width * 0.4;

	projectile.rotation = this.rotation;
	
	if( this.position.x > viewport.width * 0.50 )
	{
		projectile.flipH = true;
		projectile.velocity.x *= -1;
	}
	/*
	if( this.position.x < viewport.width * 0.50 ) {
		projectile.velocity.x = viewport.width * 0.25;
	} else {
		projectile.velocity.x = -viewport.width * 0.25;
	}
	*/

	// if( projectile.effect ) {
	// 	projectile.effect.minVelocity.x += projectile.velocity.x / 2;
	// 	projectile.effect.maxVelocity.x += projectile.velocity.x / 2;
	// 	projectile.effect.minVelocity.y += projectile.velocity.y / 2;
	// 	projectile.effect.maxVelocity.y += projectile.velocity.y / 2;
	// }

	this.projectiles.push( projectile );
	InputManager.history = [ ];

	return projectile;
};

Paddle.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	//this.offset = this.position.y / viewport.height * 0.75;
	
	if( this.projectiles.length > 0 ) {
		for( var i = 0; i < this.projectiles.length; i++ ) {
			var projectile = this.projectiles[i];

			projectile.update( deltaTime );	
		}
	}
	// if( this.projectile ) {
	// 	if( this.projectile.boundingBox.right < 0 || this.projectile.boundingBox.left > viewport.width ) {
	// 		this.projectile = null;
	// 	} else {
	// 		this.projectile.update( deltaTime );
	// 	}
	// }
	
	this.velocity = this.velocity.multiply( this.drag );
	
	if( this.bloods.length > 0 ) {
		for( var i = 0; i < this.bloods.length; i++ ) {
			if( this.bloods[i].particles[0] && this.bloods[i].particles[0].remainingLife <= 0) {
				this.bloods.splice(i,1);
				--i;
			} else {
				this.bloods[i].update( deltaTime );
			}
		}
	}
	// if( this.bloodEffect ) {
	// 	this.bloodEffect.update( deltaTime );
	// 	if( this.bloodEffect.particles.count === 0 ) {
	// 		this.bloodEffect = null;
	// 	}
	// }

	if( this.glue )
	{
		this.glue.position.x = this.position.x;
		this.glue.position.y = this.position.y;
		//this.glue.size.y = this.size.y * this.scale * 1.2;
		this.glue.size.x = this.size.x * this.scale * 6;
		
		if( this.glue.size.y < this.size.y * this.scale * 1.2 ) {
			this.glue.size.y += this.size.y * 3 * deltaTime;
		} else if( this.glue.size.y !== this.size.y * this.scale * 1.2) {
			this.glue.size.y = this.size.y * this.scale * 1.2;
		}

		// blink last 2 seconds
		if( this.gluePowerup && app.gameTime > this.gluePowerup - 2000 ) {
			this.glue.opacity = ( Math.sin(  app.gameTime / 50 ) > 0 ) ? 1 : 0;
		}
	}

	if( this.shield )
	{
		this.shield.position.x = this.position.x;
		this.shield.position.y = this.position.y;
		this.shield.size.y = this.size.y * this.scale;
		this.shield.size.x = this.shield.size.y;
		this.shield.rotation += 45 * deltaTime;
		if( this.shield.scale < 1 ) {
			this.shield.scale += 3 * deltaTime;
		} else {
			this.shield.scale = (Math.sin( app.gameTime / 250 ) * 0.5 + 0.5) * 0.15 + 1;
		}

		if( this.shield.rotation > 360 ) {
			this.shield.rotation -= 360;
		}

		// blink last 2 seconds
		if( this.shieldPowerup && app.gameTime > this.shieldPowerup - 2000 ) {
			this.shield.opacity = ( Math.sin(  app.gameTime / 50 ) > 0 ) ? 0.5 : 0;
		}
	}

	if( this.shieldPowerup && app.gameTime > this.shieldPowerup ) {
		this.shield = null;
		this.shieldPowerup = false;
	}

	if( this.speedPowerup && app.gameTime > this.speedPowerup ) {
		this.speedPowerup = false;
	}

	if( this.gluePowerup && app.gameTime > this.gluePowerup ) {
		this.glue = null;
		this.gluePowerup = false;

		var ball = SceneManager.currentScene.layers['Kombat'].components['Ball'];
		if( ball && ball.glued ) {
			ball.unglue( );
		}
	}

	if( this.timePowerup && app.gameTime > this.timePowerup ) {
		this.timePowerup = false;
	}

	if( this.effect )  {
		this.effect.update( deltaTime );
	}
};