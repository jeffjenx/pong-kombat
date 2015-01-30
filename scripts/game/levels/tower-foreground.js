function TowerForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.rope1 = new Sprite( 'Rope-1' );
	this.rope1.size.y = viewport.height * 1.25;
	this.rope1.size.x = this.rope1.size.y;
	this.addComponent( 'Rope1', this.rope1 );

	this.rope2 = new Sprite( 'Rope-2' );
	this.rope2.position.x = viewport.width * 0.3;
	this.rope2.size.y = viewport.height * 1.25;
	this.rope2.size.x = this.rope2.size.y;
	this.addComponent( 'Rope2', this.rope2 );

	this.rope3 = new Sprite( 'Rope-3' );
	this.rope3.position.x = viewport.width * 0.3;
	this.rope3.size.y = viewport.height * 1.25;
	this.rope3.size.x = this.rope3.size.y;
	this.addComponent( 'Rope3', this.rope3 );

	this.rope4 = new Sprite( 'Rope-4' );
	this.rope4.position.x = viewport.width * 0.3;
	this.rope4.size.y = viewport.height * 1.25;
	this.rope4.size.x = this.rope4.size.y;
	this.addComponent( 'Rope4', this.rope4 );

	this.ambientSound = new Sound( 'Tower' );
	this.ambientSound.setMaxVolume( 0.75 );

	this.dismantleSequence = [ Buttons.DOWN, Buttons.LEFT, Buttons.UP, Buttons.ACTION ];
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
			if( app.settings.SOUND_FX > 0 ) {
				var thudSound = new Sound( 'Thud' );
				thudSound.setMaxVolume( 0.5 );
				thudSound.play( );
			}
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
				bloodPool.opacity = 0.666;
				bloodPool.draw = function(context) {
					context.save( );
					context.globalCompositeOperation = 'normal';
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

TowerForegroundLayer.prototype = new Layer;
TowerForegroundLayer.prototype.constructor = TowerForegroundLayer;

TowerForegroundLayer.prototype.unload = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.ambientSound.stop();
	}
};


TowerForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( app.settings.SOUND_FX > 0 && !this.ambientSound.started ) {
		this.ambientSound.loop();
	}

	var ropeFrequency = Math.cos( app.gameTime / 2000 );

	this.rope1.position.x = viewport.width * 0.3 + ropeFrequency * viewport.width * 0.01;
	this.rope2.position.x = viewport.width * 0.33 - ropeFrequency * viewport.width * 0.01;
	this.rope3.position.x = viewport.width * 0.67 + ropeFrequency * viewport.width * 0.01;
	this.rope4.position.x = viewport.width * 0.7 - ropeFrequency * viewport.width * 0.01;
};