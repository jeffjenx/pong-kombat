function HellForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.leftStationaryTime = 0;
	this.rightStationaryTime = 0;

	this.lavaSound = new Sound( 'Lava' );
	if( app.settings.SOUND_FX > 0 ) {
		this.lavaSound.loop();
	}

	this.dismantleSequence = [ Buttons.RIGHT, Buttons.DOWN, Buttons.UP, Buttons.ACTION ];
	this.dismantleAnimationFrames = [
		// end = start?? call only once, end < 0?? call indefinitely
		{ start : 1.0, end : 2.0, action : function(winner, loser, percentComplete) { winner.position.x = (winner.position.x < viewport.width * 0.5) ? viewport.width * 0.02 - viewport.width * percentComplete : viewport.width * 0.98 + viewport.width * percentComplete; } },
		{ start : 2.0, end : 4.5, action: function(winner, loser, percentComplete) { loser.dismantleMeanderToMiddle(percentComplete); } },
		{ start : 5.0, end : 8.0, action : function(winner, loser, percentComplete) { loser.dismantleBurning(percentComplete); } },
		{ start : 6.0, end : 9.0, action : function(winner, loser, percentComplete) { loser.dismantleCharring(percentComplete); } },
		{ start : 10.0, end :  -1, action : function(winner, loser) { loser.dismantleCharred(); } },
		{ start : 15.0, end : 15.0, action : function() { SceneManager.currentScene.changeState( SceneManager.currentScene.states.ending ); } }
	];
}

HellForegroundLayer.prototype = new Layer;
HellForegroundLayer.prototype.constructor = HellForegroundLayer;

HellForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

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