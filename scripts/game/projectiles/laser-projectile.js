function LaserProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Laser' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.08;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
}

LaserProjectile.prototype = new Projectile;
LaserProjectile.prototype.constructor = LaserProjectile;

LaserProjectile.prototype.update = function( deltaTime ) {
	Projectile.prototype.update.call( this, deltaTime );

	this.opacity = Math.sin( app.gameTime / 33 ) * 0.5 + 0.6;
}