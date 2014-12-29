function ForestBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Forest' );
	this.addComponent( 'Background', background );

	this.addRodent( );
}

ForestBackgroundLayer.prototype = new Layer;
ForestBackgroundLayer.prototype.constructor = ForestBackgroundLayer;

ForestBackgroundLayer.prototype.addRodent = function( ) {
	this.rodent = new Sprite( Math.random( ) > 0.33 ? 'Mouse-1' : 'Mouse-2' );
	this.rodent.size.x = viewport.width * 0.07;
	this.rodent.size.y = this.rodent.size.x;
	this.rodent.position.x = Math.random( ) * viewport.width;
	this.rodent.position.y = Math.random( ) * viewport.height;
	this.rodent.registration.y = 0.25;
	this.rodent.life = 0;
	this.rodent.maxLife = Math.random( ) * 1000;

	this.rodent.targetPosition = new Vector( );
	this.rodent.targetRotation = 0;
	
	if( Math.random( ) > 0.5 ) {
		this.rodent.position.x -= viewport.width - this.rodent.size.x * this.rodent.scale;
	} else {
		this.rodent.position.x += viewport.width + this.rodent.size.x * this.rodent.scale;
	}

	if( Math.random( ) > 0.5 ) {
		this.rodent.position.y -= viewport.height - this.rodent.size.y * this.rodent.scale;
	} else {
		this.rodent.position.y += viewport.height + this.rodent.size.y * this.rodent.scale;
	}
	
	this.redirectRodent( );
	//this.addComponent( 'Rodent', this.rodent );
};

ForestBackgroundLayer.prototype.redirectRodent = function( rodent ) {
	this.rodent.targetPosition.x = Math.random( ) * viewport.width;
	this.rodent.targetPosition.y = Math.random( ) * viewport.height;

	if( this.rodent.life > this.rodent.maxLife ) {
		if( this.rodent.boundingBox.bottom < 0 && this.rodent.boundingBox.right < 0 ) {
			this.removeComponent( 'Rodent' );
			this.addRodent( );
		} else {
			this.rodent.targetPosition.x -= viewport.width;
			this.rodent.targetPosition.y -= viewport.height;
		}
	}

	this.rodent.velocity = this.rodent.targetPosition.subtract( this.rodent.position ).normalize( ).multiply( viewport.width * 0.1 );
	this.rodent.targetRotation = Math.atan2( this.rodent.velocity.y, this.rodent.velocity.x ) * Math.TO_DEGREES + 90;
};

ForestBackgroundLayer.prototype.draw = function( context ) {
	Layer.prototype.draw.call( this, context );

	this.rodent.draw( context );
};

ForestBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	if( this.rodent.position.distance( this.rodent.targetPosition ) < viewport.width * 0.1 ) {
		this.redirectRodent( this.rodent );
	}

	var sineGameTime = Math.sin( app.gameTime / 100 );

	this.rodent.velocity.x *= 1 + sineGameTime * 0.02;
	this.rodent.velocity.y *= 1 + sineGameTime * 0.02;

	if( Math.abs( this.rodent.targetRotation - this.rodent.rotation ) > 10 ) {
		this.rodent.rotation += (this.rodent.targetRotation < this.rodent.rotation) ? -9 : 9;
	} else {
		this.rodent.update( deltaTime );
		this.rodent.rotation += 2 * sineGameTime;
	}

	this.rodent.life += 1;
};