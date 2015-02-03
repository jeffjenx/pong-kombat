var Powerups = {
	GLUE : 0,
	LIFE : 1,
	SHIELD : 3,
	SPEED : 4,
	TIME : 5
};

function Powerup( texture ) {
	Sprite.call( this, texture );
	
	/*
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	this.size.x = viewport.height * 0.05;
	this.size.y = viewport.height * 0.05;
	*/
	this.timeoutTime; // set from kombat layer
}

Powerup.prototype = new Sprite;
Powerup.prototype.constructor = Powerup;

Powerup.prototype.collect = function( kombatant ) {
	this.layer.removeComponent( this.id );
	this.layer.nextPowerup = this.layer.scene.timeElapsed + 5 + Math.random( ) * 10;
};

Powerup.prototype.timedOut = function( ) {
	this.layer.removeComponent( this.id );
	this.layer.nextPowerup = this.layer.scene.timeElapsed + 5 + Math.random( ) * 10;
}

Powerup.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );

	this.rotation = Math.sin( app.gameTime / 500 ) * 5;

	if( this.scale < 1 ) {
		this.scale += deltaTime;
	} else if( this.scale !== 1 ) {
		this.scale = 1;
	}

	if( this.layer.scene.timeElapsed >= this.timeoutTime ) {
		this.timedOut();
	}
}