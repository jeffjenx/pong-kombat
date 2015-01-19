function GreenArrowProjectile( sourcePaddle ) {
	Sprite.call( this, 'Projectile-Green-Arrow' );
	
	this.sourcePaddle = false;
	this.size.x = viewport.height * 0.13;
	this.size.y = this.size.x * 0.3;
	this.position.x = sourcePaddle.position.x;
	this.position.y = sourcePaddle.position.y;
	this.sourcePaddle = sourcePaddle;
	this.scale = 0;
}

GreenArrowProjectile.prototype = new Projectile;
GreenArrowProjectile.prototype.constructor = GreenArrowProjectile;

GreenArrowProjectile.prototype.draw = function( context ) {
	Sprite.prototype.draw.call( this, context );
};

GreenArrowProjectile.prototype.update = function( deltaTime ) {
	Projectile.prototype.update.call( this, deltaTime );

	this.rotation -= 180 * deltaTime;
	/*
	Sprite.prototype.update.call( this, deltaTime );

	if( this.sourcePaddle ) {
		if( this.boundingBox.left > viewport.width || this.boundingBox.right < 0 || this.boundingBox.top > viewport.height || this.boundingBox.bottom < 0 ) {
			this.sourcePaddle.projectile = null;
		}	
	}

	if( this.scale < 1 ) {
		this.scale += deltaTime * 10; 
	}
	*/
}