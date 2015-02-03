function GreenArrowProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Green-Arrow' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.13;
	this.size.y = this.size.x * 0.3;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
	this.rotate = false;
}

GreenArrowProjectile.prototype = new Projectile;
GreenArrowProjectile.prototype.constructor = GreenArrowProjectile;