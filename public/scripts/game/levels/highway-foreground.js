function HighwayForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.dismantleSequence = [ Buttons.LEFT, Buttons.LEFT, Buttons.LEFT, Buttons.ACTION ];
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
			var strike = new Vector( [viewport.width * 0.6, viewport.height * 0.5 ] );
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
		{ start : 7.25, end : 7.25, action : function() {
			if( app.settings.SOUND_FX > 0 ) {
				var thudSound = new Sound( 'Thud' );
				thudSound.setMaxVolume( 0.5 );
				thudSound.play( );
			}
		} },
		{ start : 7.25, end : 10.25, action : function(winner, loser, percentComplete) {
			loser.dismantleSplashing('Particle-Blood1');
		} },
		{ start : 7.25, end : -1, action : function(winner, loser, percentComplete) {
			var vehicles = SceneManager.currentScene.layers['Background'].vehicles;

			for( var i in vehicles ) {
				var vehicle = vehicles[i];
				if( vehicle.velocity.y < 0 )
				{
					if( Collision.RectRect( vehicle.boundingBox, loser.boundingBox ) ) {
						loser.rotationSpeed = (vehicle.position.x < loser.position.x) ? 5 : -5;
						loser.velocity.y = -viewport.height * 0.05;
						if( !SceneManager.currentScene.layers['Foreground'].components[vehicle.id] ) {
							SceneManager.currentScene.layers['Foreground'].addComponent(vehicle.id, vehicle);
							vehicle.velocity.y *= 0.5;
						}
						//vehicles[i].draw(viewportContext);
					}
				}
			}

			loser.rotation += loser.rotationSpeed || 0;
			loser.rotationSpeed *= 0.9;
		} },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

HighwayForegroundLayer.prototype = new Layer;
HighwayForegroundLayer.prototype.constructor = HighwayForegroundLayer;