function HellForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.leftStationaryTime = 0;
	this.rightStationaryTime = 0;
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