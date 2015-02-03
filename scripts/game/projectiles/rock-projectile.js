function RockProjectile( sourcePaddle ) {
	Sprite.call( this, 'Paddle-Monolith' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.04;
	this.size.y = this.size.x;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
	this.lifeModifier = 0.5;
}

RockProjectile.prototype = new Projectile;
RockProjectile.prototype.constructor = RockProjectile;