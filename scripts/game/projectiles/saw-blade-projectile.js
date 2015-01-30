function SawBladeProjectile( sourcePaddle ) {
	Sprite.call( this, 'Ball-Saw-Blade' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.2;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.startPosition = this.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
}

SawBladeProjectile.prototype = new Projectile;
SawBladeProjectile.prototype.constructor = SawBladeProjectile;