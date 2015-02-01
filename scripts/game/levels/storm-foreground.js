function StormForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.addLightning( );

	this.ambientSound = new Sound( 'Storm' );
	this.ambientSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
	
	this.dismantleSequence = [ Buttons.RIGHT, Buttons.RIGHT, Buttons.RIGHT, Buttons.ACTION ];
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action : function(winner, loser, percentComplete) {
			winner.velocity.x = (winner.position.x < viewport.width * 0.5) ? viewport.width * 0.5 : -viewport.width * 0.5;
		} },
		{ start : 1.0, end : 3.0, action : function(winner, loser, percentComplete) {
			winner.velocity.x /= winner.drag;
			winner.position.y = viewport.height * 0.51 + winner.size.y * winner.scale * 0.5 * percentComplete;
		} },
		{ start : 2.75, end : 2.75, action : function(winner, loser) {
			loser.getHit();
			if( app.settings.SOUND_FX > 0 ) {
				var screamingSound = new Sound( 'Long-Scream' );
				screamingSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
				screamingSound.play( );
			}
		} },
		{ start : 2.75, end : 5.0, action : function(winner, loser, percentComplete) {
			var strike = new Vector( [viewport.width * 0.62, viewport.height * 0.53 ] );
			loser.rotation = -360 * 3 * percentComplete;
			loser.scale = 1 + percentComplete;
			loser.position = loser.position.add( strike.subtract(loser.position).multiply(1/60) );
		} },

		{ start : 5.0, end : 7.25, action : function(winner, loser, percentComplete) {
			if( !loser.endRotation ) {
				loser.endRotation = 2 + Math.random();
			}
			loser.rotation = -360 * loser.endRotation * percentComplete;
			loser.scale = 2 - percentComplete * 1.25;
		} },
		{ start : 7.25, end : 7.25, action : function(winner, loser) {
			// lightning bolt
			var strike = new Sprite( 'Lightning-2' );
			strike.opacity = 0.75;
			strike.size.x = viewport.width;
			strike.size.y = viewport.height;
			strike.flipH = false;
			strike.rotation = 0;
			strike.draw = function( context ) {
				context.save();
				context.globalCompositeOperation = 'screen';
				Sprite.prototype.draw.call( this, context );
				context.restore();
			};
			SceneManager.currentScene.layers['Foreground'].addComponent( 'Strike', strike );

			var lightning = new Sprite( 'White' );
			lightning.frames = 0;
			lightning.size.x = viewport.width;
			lightning.size.y = viewport.height;
			lightning.lifetime = 25 + Math.random( ) * 75;
			lightning.draw = function( context ) {
				context.save();
				context.globalCompositeOperation = 'overlay';
				Sprite.prototype.draw.call( this, context );
				Sprite.prototype.draw.call( this, context );
				context.restore();
			};
			SceneManager.currentScene.layers['Foreground'].addComponent( 'Lightning', lightning );

			if( app.settings.SOUND_FX > 0 ) {
				var thunderSound = new Sound( 'Thunder-Loud' );
				thunderSound.setMaxVolume( 0.6 * app.settings.SOUND_FX / 11 );
				thunderSound.play( );
			}
		} },
		{ start : 7.25, end : 10.25, action : function(winner, loser, percentComplete) {
			loser.dismantleExploding(loser.broken.resource);
		} },
		{ start : 12.0, end : 12.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

StormForegroundLayer.prototype = new Layer;
StormForegroundLayer.prototype.constructor = StormForegroundLayer;

StormForegroundLayer.prototype.unload = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.ambientSound.stop();
	}
};

StormForegroundLayer.prototype.addLightning = function( ) {
	if( Math.random( ) > 0.33 ) {
		var strike = new Sprite( Math.random( ) > 0.5 ? 'Lightning-1' : 'Lightning-2' );
		strike.opacity = 0.75;
		strike.size.x = viewport.width * (1 + Math.random( ) * 0.5);
		strike.size.y = viewport.height * (1 + Math.random( ) * 0.5);
		strike.flipH = (Math.random( ) > 0.5 );
		strike.rotation = (Math.random( ) > 0.5) ? 180 : 0;
		strike.draw = function( context ) {
			context.save();
			context.globalCompositeOperation = 'screen';
			Sprite.prototype.draw.call( this, context );
			context.restore();
		};
		this.addComponent( 'Strike', strike );
		if( app.settings.SOUND_FX > 0 ) {
			var thunderSound = new Sound( 'Thunder-Medium' );
			thunderSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
			thunderSound.play( );
		}
	} else {
		if( app.settings.SOUND_FX > 0 ) {
			var thunderSound = new Sound( 'Thunder-Quiet' );
			thunderSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
			thunderSound.play( );
		}
	}
	
	var lightning = new Sprite( 'White' );
	lightning.frames = 0;
	lightning.size.x = viewport.width;
	lightning.size.y = viewport.height;
	lightning.lifetime = 25 + Math.random( ) * 75;
	lightning.draw = function( context ) {
		context.save();
		context.globalCompositeOperation = 'overlay';
		Sprite.prototype.draw.call( this, context );
		Sprite.prototype.draw.call( this, context );
		context.restore();
	};
	this.addComponent( 'Lightning', lightning );
};

StormForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( app.settings.SOUND_FX > 0 && !this.ambientSound.started ) {
		this.ambientSound.loop();
	}

	var lightning = this.components['Lightning'];
	if( lightning ) {
		lightning.frames += 1;

		if( lightning.frames > 3 ) {
			lightning.frames = 0;
			lightning.opacity = Math.random( );
		}

		lightning.lifetime -= 1;

		if( lightning.lifetime <= 0 ) {
			this.removeComponent( 'Lightning' );
			this.nextLightning = Date.now( ) + 5000 + Math.random( ) * 7000;
		}
	}
	else if( Date.now( ) > this.nextLightning )
	{
		this.addLightning( );
	}

	var strike = this.components['Strike'];
	if( strike ) {
		strike.opacity -= Math.random( ) * 0.20 - 0.05;
		if( strike.opacity <= 0 ) {
			this.removeComponent( 'Strike' );
		}
	}
};