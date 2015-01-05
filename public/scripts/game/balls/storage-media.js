function StorageMedia( ) {
	var textures = [ 'Ball-Compact-Disc', 'Ball-Cassette-Tape', 'Ball-Vinyl-Record', 'Ball-Floppy-Disk' ];

	Ball.call( this, textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	//this.size.x = viewport.width * 0.05;
	switch( this.resource ) {
		case 'Ball-Cassette-Tape' : this.size.x = viewport.width * 0.045; break;
		case 'Ball-Compact-Disc' : this.size.x = viewport.width * 0.04; break;
		case 'Ball-Vinyl-Record' : this.size.x = viewport.width * 0.05; break;
		case 'Ball-Floppy-Disk' : this.size.x = viewport.width * 0.035; break;
	}
	this.size.y = this.size.x;

	this.rotationDirection = 1;
}

StorageMedia.prototype = new Ball;
StorageMedia.prototype.constructor = Logo;

StorageMedia.prototype.hitPaddle = function(kombatant) {
	Ball.prototype.hitPaddle.call( this, kombatant );
	this.rotationDirection *= -1;
}

StorageMedia.prototype.hitWall = function() {
	Ball.prototype.hitWall.call( this );
	this.rotationDirection *= -1;
}

StorageMedia.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );

	Sprite.prototype.draw.call( this, context );
};

StorageMedia.prototype.update = function( deltaTime ) {
	//Ball.prototype.update.call( this, deltaTime );
	
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = this.scale * 0.666 * this.opacity;
		}
	} else {
		this.scale = this.scale;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = 0.666 * this.opacity;
		}
		Sprite.prototype.update.call( this, deltaTime );
	}

	this.rotation += this.rotationDirection * this.speed * 15 * deltaTime;
	if( this.rotation > 360 ){
		this.rotation -= 360;
	}
	if( this.rotation < 0 ) {
		this.rotation += 360;
	}
	
	this.updateCollision( );
};