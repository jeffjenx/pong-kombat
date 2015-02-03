function FingerProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Finger' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.07;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
	this.rotate = false;
}

FingerProjectile.prototype = new Projectile;
FingerProjectile.prototype.constructor = FingerProjectile;