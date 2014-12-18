var Powerups = {
	SPEED : 0,
	SHIELD : 1,
	SIZE : 2
};

function Powerup( ) {
	Sprite.call( this, 'Ball' );
	
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	this.size.x = viewport.height * 0.05;
	this.size.y = viewport.height * 0.05;
}

Powerup.prototype = new Sprite;
Powerup.prototype.constructor = Powerup;

Powerup.prototype.collect = function( kombatant ) {
	this.layer.removeComponent( this.id );
	this.layer.nextPowerup = this.layer.scene.timeElapsed + 5 + Math.random( ) * 5;
};