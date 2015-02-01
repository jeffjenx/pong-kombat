function HellForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.leftStationaryTime = 0;
	this.rightStationaryTime = 0;

	this.ambientSound = new Sound( 'Lava' );
	this.ambientSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );

	this.dismantleSequence = [ Buttons.RIGHT, Buttons.DOWN, Buttons.UP, Buttons.ACTION ];
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
		{ start : 7.25, end : 7.25, action : function() {
			if( app.settings.SOUND_FX > 0 ) {
				var thudSound = new Sound( 'Thud' );
				thudSound.setMaxVolume( 0.5 * app.settings.SOUND_FX / 11 );
				thudSound.play( );
			}
		} },
		{ start : 7.25, end : 11.0, action : function(winner, loser, percentComplete) { loser.dismantleBurning(percentComplete); } },
		{ start : 11.0, end : 15.0, action : function(winner, loser, percentComplete) { loser.dismantleCharring(percentComplete); loser.opacity = 1 - percentComplete; } },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

HellForegroundLayer.prototype = new Layer;
HellForegroundLayer.prototype.constructor = HellForegroundLayer;

HellForegroundLayer.prototype.unload = function() {
	if( app.settings.SOUND_FX > 0 ) {
		this.ambientSound.stop();
	}
};

HellForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( app.settings.SOUND_FX > 0 && !this.ambientSound.started ) {
		this.ambientSound.loop();
	}

	var leftKombatant = this.scene.layers['Kombat'].components['LeftKombatant'];
	var rightKombatant = this.scene.layers['Kombat'].components['RightKombatant'];

	if( leftKombatant ) {
		if( leftKombatant.paddle.velocity.x === 0 && leftKombatant.paddle.velocity.y === 0 ) {
			this.leftStationaryTime += deltaTime;
		} else {
			this.leftStationaryTime = 0;
		}
	}

	if( rightKombatant ) {
		if( rightKombatant.paddle.velocity.x === 0 && rightKombatant.paddle.velocity.y === 0 ) {
			this.rightStationaryTime += deltaTime;
		} else {
			this.rightStationaryTime = 0;
		}
	}

	if( this.leftStationaryTime > 3 ) {
		rightKombatant.score += deltaTime * 0.33;
	}

	if( this.rightStationaryTime > 3 ) {
		leftKombatant.score += deltaTime * 0.33;
	}
};