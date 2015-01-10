function FingerProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Finger' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.07;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
}

FingerProjectile.prototype = new Projectile;
FingerProjectile.prototype.constructor = FingerProjectile;

FingerProjectile.prototype.update = function( deltaTime ) {
	Projectile.prototype.update.call( this, deltaTime );

	this.rotation = 0;
}