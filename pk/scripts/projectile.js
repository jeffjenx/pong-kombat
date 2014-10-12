function Projectile( ) {
	Sprite.call( this, 'Ball' );
	
	this.size.x = viewport.height * 0.02;
	this.size.y = viewport.height * 0.02;
}

Projectile.prototype = new Sprite;
Projectile.prototype.constructor = Projectile;

Projectile.prototype.hitPaddle = function( ) {
	console.log( 'hit paddle' );
};

Projectile.prototype.update = function( deltaTime ) {
	Sprite.prototype.update.call( this, deltaTime );
	
	if( this.boundingBox.left > viewport.width || this.boundingBox.right < 0 ) {
		this.layer.removeComponent( this.id );
	}
};