function PortalForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.ambientSound = new Sound( 'Space' );
	this.ambientSound.setMaxVolume( 1 );
	
	this.dismantleSequence = [ Buttons.RIGHT, Buttons.LEFT, Buttons.DOWN, Buttons.ACTION ];
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
			var portal = SceneManager.currentScene.layers['Background'].components['InnerHole'];
			loser.rotation = -360 * 3 * percentComplete;
			loser.scale = 1 + percentComplete;
			loser.position = loser.position.add( portal.position.subtract(loser.position).multiply(1/60) );
		} },
		{ start : 6.00, end : 6.00, action : function(winner, loser) {
			if( app.settings.SOUND_FX > 0 ) {
				var screamingSound = new Sound( 'Long-Scream' );
				screamingSound.setMaxVolume( 0.1 );
				screamingSound.play( );
			}
		} },
		{ start : 9.00, end : 9.00, action : function(winner, loser) {
			if( app.settings.SOUND_FX > 0 ) {
				var screamingSound = new Sound( 'Long-Scream' );
				screamingSound.setMaxVolume( 0.05 );
				screamingSound.play( );
			}
		} },
		{ start : 5.0, end : 13.0, action : function(winner, loser, percentComplete) {
			var portal = SceneManager.currentScene.layers['Background'].components['InnerHole'];
			loser.rotation -= 15 * (percentComplete + 0.5);
			loser.scale = 2 - percentComplete * 1.25;
			loser.opacity = Math.min( 1, 2 - percentComplete * 2 );
			loser.effect.count = 0; 
			loser.position = loser.position.add( portal.position.subtract(loser.position).multiply(1/60) );
			if( percentComplete > 0.5 ) {
				loser.size.x += Math.sin(app.gameTime / 330) * loser.size.y * 0.001;
				//loser.size.y += Math.sin(Math.PI + app.gameTime / 120) * viewport.width * 0.001;
			}
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

PortalForegroundLayer.prototype = new Layer;
PortalForegroundLayer.prototype.constructor = PortalForegroundLayer;

PortalForegroundLayer.prototype.unload = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.ambientSound.stop();
	}
};

PortalForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( app.settings.SOUND_FX > 0 && !this.ambientSound.started ) {
		this.ambientSound.loop();
	}
};