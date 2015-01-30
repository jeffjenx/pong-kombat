function SpeedPowerup( ) {
	Powerup.call( this, 'Ball' );
	this.tint = new Color( 255, 250, 250 );
	
	this.position.x = Math.random( ) * viewport.width * 0.5 + viewport.width * 0.25;
	this.position.y = Math.random( ) * viewport.height * 0.6 + viewport.height * 0.2;
}

SpeedPowerup.prototype = new Powerup;
SpeedPowerup.prototype.constructor = SpeedPowerup;

SpeedPowerup.prototype.collect = function( kombatant ) {
	Powerup.prototype.collect.call( this, kombatant );
	kombatant.paddle.tint = new Color( 0, 0, 0 );
};