function GreenPaddle( ) {
	this.color = new Color( 0, 255, 0 );
	this.enum = "GREEN";
	this.name = "Green Paddle";
	this.bigness = 2.50;
	this.quickness = 2.00;
	
	this.projectileSequence = [ Buttons.LEFT, Buttons.UP, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.LEFT, Buttons.RIGHT, Buttons.LEFT, Buttons.ACTION ];

	this.endStory = "The victory has earned them much respect and notoriety. And, although the tournament has brought much joy to them, Green Paddle returns to their love of writing and goes on to pen best-selling romance novels \"Potent Potables\" and \"Under the Pale Moon Light.\"";
	this.story = "Green Paddle is currently working through a mid-life crisis. They enter the Pong Lao Tournament with hopes of finding inner peace and, perhaps, a new career.";
	
	Paddle.call( this, 'Paddle-Green' );
	this.icon = Resources['Paddle-Icon-Green'];
	this.broken = Resources['Paddle-Broken-Green'];

	this.nameSound = new Sound( 'Green-Paddle' );
	this.nameSound.setMaxVolume( 1 * app.settings.SOUND_FX / 11 );
	
	this.currentStep = 0;
	this.dismantleAnimationFrames = [
		// (end = start) ? call only once, (end < 0) ? call indefinitely
		{ start : 1.0, end : 1.0, action : function(winner) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.5 );
		} },
		{ start : 2.5, end : 3.5, action : function(winner, loser) { loser.dismantleStickToWall(winner); } },
		{ start : 4.5, end : 5.5, action : function(winner, loser, percentComplete) {
			if(loser.position.x > viewport.width / 2){
				winner.rotation = -30 * percentComplete;
			} else{
				winner.rotation = 180 + 30 * percentComplete;
			}
		} },
		{ start : 6.0, end : 10.0, action : function(winner, loser, percentComplete) {
			if(loser.position.x > viewport.width / 2){
				winner.rotation = -30 + 60 * percentComplete;
			} else {
				winner.rotation = 180 + 30 - 60 * percentComplete;
			}
		} },
		{ start : 6.0, end : 6.0, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.05 );
		} },
		{ start : 6.5, end : 6.5, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.15 );
		} },
		{ start : 7.0, end : 7.0, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.35 );
		} },
		{ start : 7.5, end : 7.5, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.60 );
		} },

		{ start : 8.0, end : 8.0, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.25 );
		} },

		{ start : 8.5, end : 8.5, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.60 );
		} },
		{ start : 9.0, end : 9.0, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.35 );
		} },
		{ start : 9.5, end : 9.5, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.15 );
		} },
		{ start : 10.0, end : 10.0, action : function(winner, loser) {
			var projectile = winner.shootProjectile();
			projectile.velocity = projectile.velocity.multiply( 1.05 );
		} },
		{ start : 1.0, end : 13.0, action : function(winner,loser) {
			for( var i = 0; i < winner.projectiles.length; ++i ) {
				var projectile = winner.projectiles[i];

				if( Collision.RectRect(projectile.boundingBox,loser.boundingBox) ) {
					continue;
				}

				if( projectile.position.y > viewport.height * 0.5 ) {
					projectile.velocity.y -= viewport.height * 0.004;
				} else {
					projectile.velocity.y += viewport.height * 0.004;
				}

				projectile.rotation = Math.atan2(projectile.velocity.y, projectile.velocity.x) * Math.TO_DEGREES;
			}
		} },
		{ start : 10.0, end : 12.0, action : function(winner, loser, percentComplete) {
			if(loser.position.x > viewport.width / 2){
				winner.rotation = 30 * (1-percentComplete);
			} else {
				winner.rotation = -30 * (1-percentComplete);
			}
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

GreenPaddle.prototype = new Paddle;
GreenPaddle.prototype.constructor = GreenPaddle;

GreenPaddle.prototype.draw = function( context ) {
	// Paddle.prototype.draw.call( this, context );
	Component.prototype.draw.call( this, context );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	this.patternContext.save( );
	this.patternContext.translate( -this.offset * this.patternCanvas.width, -Math.sin(this.offset * 2 * Math.PI) * this.patternCanvas.height * 0.11 );
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.fillRect( -this.patternCanvas.width, -this.patternCanvas.height, this.patternCanvas.width * 3, this.patternCanvas.height * 3 );
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
	context.save();
	context.globalCompositeOperation = 'difference';
	context.globalAlpha = this.opacity;// * 0.5;
	//context.globalAlpha = this.opacity * Math.abs(this.offset * 2 - 1);
	if( !this.flipH )
	{
		context.scale( -1, -1 );
	}
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width * (this.size.x / this.size.y) * 0.75,
		this.patternCanvas.height * 0.75,
		-width * (1-this.registration.x),
		-height * this.registration.y,
		width,
		height
	);
	context.restore();

	context.globalAlpha *= this.gloss.opacity;
	context.drawImage(
		this.gloss.image,
		-width * this.registration.x * 6.5,
		-height * this.registration.y * 1.15,
		width * 6.5,
		height * 1.15
	);
	context.restore();

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

	if( this.effect ) {
		this.effect.draw( context );
	}

	if( this.bloods.length > 0 ) {
		for( var i = 0; i < this.bloods.length; i++ ) {
			this.bloods[i].draw( context );
		}
	}
};

GreenPaddle.prototype.shootProjectile = function( ) {
	var projectile = new GreenArrowProjectile( this );
	Paddle.prototype.shootProjectile.call( this, projectile );
	
	if( app.settings.SOUND_FX > 0 ) {
		projectile.sound = new Sound( 'Arrow-Fired' );
		projectile.sound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
		projectile.sound.play();
	}

	return projectile;
};

GreenPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );

	this.offset += 0.11 * deltaTime;
	if( this.offset > 1 ) {
		this.offset = 0;
	}
};