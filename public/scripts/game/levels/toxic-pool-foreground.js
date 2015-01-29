function ToxicPoolForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.sirens = new Sprite( 'Sirens' );
	this.sirens.size.x = viewport.width * 1.25;
	this.sirens.size.y = viewport.height * 1.25;
	this.addComponent( 'Sirens', this.sirens );

	this.ambientSound = new Sound( 'Acid' );
	this.ambientSound.setMaxVolume( 0.5 );
	this.sirenSound = new Sound( 'Siren' );
	this.sirenSound.setMaxVolume( 0.11 );
	
	this.dismantleSequence = [ Buttons.UP, Buttons.DOWN, Buttons.LEFT, Buttons.ACTION ];
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
				screamingSound.setMaxVolume( 0.5 );
				screamingSound.play( );
			}
		} },
		{ start : 2.75, end : 5.0, action : function(winner, loser, percentComplete) {
			loser.rotation = -360 * 3 * percentComplete;
			loser.scale = 1 + percentComplete;
			loser.dismantleMeanderToMiddle(percentComplete);
		} },

		{ start : 5.0, end : 7.25, action : function(winner, loser, percentComplete) {
			if( !loser.endRotation ) {
				loser.endRotation = 2 + Math.random();
			}
			loser.rotation = -360 * loser.endRotation * percentComplete;
			loser.scale = 2 - percentComplete * 1.25;
		} },
		{ start : 7.25, end : 7.25, action : function(winner, loser) {
			loser.gloss = new Sprite( 'Paddle-Melted' );
			loser.gloss.opacity = 0;
			loser.gloss.noClip = true;
			loser.opacity = 0;
			//loser.size.y *= 0.5;

			if( app.settings.SOUND_FX > 0 ) {
				var splashSound = new Sound( 'Splash' );
				splashSound.setMaxVolume( 0.6 );
				splashSound.play( );
			}
		} },
		{ start : 7.25, end : 10.25, action : function(winner, loser, percentComplete) {
			loser.dismantleSplashing('Paddle-Broken-Green');
		} },
		{ start : 9.5, end : 10.0, action : function( winner, loser, percentComplete ) {
			loser.scale = percentComplete;
			loser.opacity = percentComplete * 0.33;
			loser.gloss.opacity = percentComplete * 2;
			loser.rotation = 0;
		} },
		{ start : 9.0, end : -1, action : function(winner, loser, percentComplete) {
			//loser.position.y = viewport.height * 0.51 + Math.sin(app.gameTime / 400) * viewport.height * 0.01;
			//loser.scale += Math.sin(app.gameTime / 120) * 0.5;
			loser.rotation += Math.sin(app.gameTime / 420) * 0.33;
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

ToxicPoolForegroundLayer.prototype = new Layer;
ToxicPoolForegroundLayer.prototype.constructor = ToxicPoolForegroundLayer;

ToxicPoolForegroundLayer.prototype.unload = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.ambientSound.stop();
		this.sirenSound.stop();
	}
};

ToxicPoolForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( app.settings.SOUND_FX > 0 && !this.ambientSound.started ) {
		this.ambientSound.loop();
	}

	this.sirens.opacity = 0.25 + Math.sin( app.gameTime / 250 ) / 4;
	this.sirens.rotation += 180 * deltaTime;
	if( this.sirens.rotation > 360 ) {
		this.sirens.rotation -= 360;
		if( app.settings.SOUND_FX > 0 ) {
			this.sirenSound.play();
		}
	}
};