function IceRiverForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.riverSound = new Sound( 'River' );
	if( app.settings.SOUND_FX > 0 ) {
		this.riverSound.loop();
	}

	this.dismantleSequence = [ Buttons.UP, Buttons.RIGHT, Buttons.LEFT, Buttons.ACTION ];
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 1.0, action : function(winner, loser, percentComplete) {
			winner.velocity.x = (winner.position.x < viewport.width * 0.5) ? viewport.width * 0.5 : -viewport.width * 0.5;
		} },
		{ start : 1.0, end : 3.0, action : function(winner, loser, percentComplete) {
			winner.velocity.x /= winner.drag;
			winner.position.y = viewport.height * 0.51 + winner.size.y * winner.scale * 0.5 * percentComplete;
		} },
		{ start : 2.75, end : 2.75, action : function(winner, loser) { loser.getHit(); } },
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
			loser.gloss = new Sprite( 'Paddle-Frozen' );
			loser.gloss.opacity = 0;
			loser.gloss.noClip = true;
			loser.opacity = 0;
			//loser.size.y *= 0.5;
		} },
		{ start : 7.25, end : 10.25, action : function(winner, loser, percentComplete) {
			loser.dismantleSplashing(percentComplete);
		} },
		{ start : 9.5, end : 10.0, action : function( winner, loser, percentComplete ) {
			loser.scale = percentComplete;
			loser.opacity = percentComplete * 0.33;
			loser.gloss.opacity = percentComplete * 2;
			loser.rotation = 0;
		} },
		{ start : 9.0, end : 15.0, action : function(winner, loser, percentComplete) {
			loser.position.x = viewport.width * 0.5 + viewport.width * 0.75 * percentComplete;
			loser.position.y = viewport.height * 0.51 + Math.sin(app.gameTime / 1000) * viewport.height * 0.01;
			//loser.scale += Math.sin(app.gameTime / 120) * 0.5;
			loser.rotation += Math.sin(app.gameTime / 240) * 0.5;
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

IceRiverForegroundLayer.prototype = new Layer;
IceRiverForegroundLayer.prototype.constructor = IceRiverForegroundLayer;