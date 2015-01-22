function PitForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.pitSound = new Sound( 'Pit' );
	if( app.settings.SOUND_FX > 0 ) {
		this.pitSound.loop();
	}

	this.dismantleSequence = [ Buttons.RIGHT, Buttons.UP, Buttons.LEFT, Buttons.ACTION ];
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
		{ start : 7.25, end : 10.25, action : function(winner, loser, percentComplete) {
			loser.dismantleSplashing('Particle-Blood1');
		} },
		{ start : 9.0, end : 15.0, action : function(winner, loser, percentComplete) {
			var bloodPool = SceneManager.currentScene.layers['Background'].components['BloodPool'];

			if( !bloodPool ) {
				var bloodPool = new Sprite( 'Blood-Pool' );
				bloodPool.size.x = loser.size.y * loser.scale * 2.25;
				bloodPool.size.y = loser.size.y * loser.scale * 2.25;
				bloodPool.rotation = loser.rotation;
				bloodPool.scale = 0;
				bloodPool.draw = function(context) {
					context.save( );
					context.globalCompositeOperation = 'screen';
					context.globalAlpha *= this.opacity;
					context.translate( this.position.x, this.position.y );
					context.rotate( this.rotation * Math.TO_RADIANS );
					if( this.flipH )
					{
						context.scale( -1, 1 );
					}
					
					context.drawImage( this.image, -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
					context.restore( );
				};
				SceneManager.currentScene.layers['Background'].addComponent('BloodPool', bloodPool );
			}

			bloodPool.scale = percentComplete;
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

PitForegroundLayer.prototype = new Layer;
PitForegroundLayer.prototype.constructor = PitForegroundLayer;