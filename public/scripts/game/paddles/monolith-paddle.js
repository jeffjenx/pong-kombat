function MonolithPaddle( ) {
	this.color = new Color( 155, 50, 0 );
	this.enum = "MONOLITH"
	this.name = "Monolith";
	this.bigness = 5.00;
	this.quickness = 3.00;

	this.projectileSequence = [ Buttons.DOWN, Buttons.UP, Buttons.DOWN, Buttons.ACTION ];
	this.dismantleSequence = [ Buttons.UP, Buttons.DOWN, Buttons.UP, Buttons.ACTION ];
	
	this.endStory = "After the tournament, Monolith was found lifeless in the barren regions of northern Chile. They were taken to a local facility where their chemical makeup was determined to be that of a MGP Pallasite meteorite, Imilac, and are held captive to this day.";
	this.story = "Monolith has spent the past million years eroding into their current form. When White Paddle constructed his tournament, they enlisted the massive paddle for the sole purpose of intimidating the opposition.";
	
	Paddle.call( this, 'Paddle-Monolith' );
	
	this.lifeModifier = 0.5;
	this.gloss = new Sprite( 'Paddle-Gloss-Monolith' );

	// Monolith throws 3 rocks at a time
	this.projectile2 = null;
	this.projectile3 = null;
}

MonolithPaddle.prototype = new Paddle;
MonolithPaddle.prototype.constructor = MonolithPaddle;

MonolithPaddle.prototype.dismantle = function( opponent ) {
	var sceneTime = opponent.layer.scene.stateTime;
	
	if( sceneTime < 2 ) {
	} else if( sceneTime < 5 ) {
		this.velocity.x = viewport.width * ( sceneTime - 2 / 100 );
	}
};

MonolithPaddle.prototype.draw = function( context ) {
	Paddle.prototype.draw.call( this, context );

	if( this.projectile2 ) {
		this.projectile2.draw( context );
	}

	if( this.projectile3 ) {
		this.projectile3.draw( context );
	}
};

MonolithPaddle.prototype.shootProjectile = function( ) {
	//Paddle.prototype.shootProjectile.call( this );
	//this.projectile.tint = this.color;

	this.projectile = new RockProjectile( this );
	this.projectile.sourcePaddle = this;
	this.projectile.position.x = this.position.x;
	this.projectile.position.y = this.position.y;
	
	var direction = 0;
	if( this.position.x > viewport.width * 2 ) {
		direction -= 180;
	}
	this.projectile.velocity.x = Math.cos( direction * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile.velocity.y = Math.sin( direction * Math.TO_RADIANS ) * viewport.width * 0.33;

	this.projectile2 = new RockProjectile( this );
	this.projectile2.sourcePaddle = this;
	this.projectile2.position.x = this.projectile.position.x;
	this.projectile2.position.y = this.projectile.position.y - this.size.y * 0.11;
	this.projectile2.velocity.x = Math.cos( (direction-1.5) * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile2.velocity.y = Math.sin( (direction-1.5) * Math.TO_RADIANS ) * viewport.width * 0.33;

	this.projectile3 = new RockProjectile( this );
	this.projectile3.sourcePaddle = this;
	this.projectile3.position.x = this.projectile.position.x;
	this.projectile3.position.y = this.projectile.position.y + this.size.y * 0.11;
	this.projectile3.velocity.x = Math.cos( (direction+1.5) * Math.TO_RADIANS ) * viewport.width * 0.33;
	this.projectile3.velocity.y = Math.sin( (direction+1.5) * Math.TO_RADIANS ) * viewport.width * 0.33;
	
	//if( this.position.x > viewport.width * 0.50 )
	//{
	//	this.projectile.velocity.x *= -1;
	//}
};

MonolithPaddle.prototype.updateRocksBoundingBox = function( ) {
	this.projectile.boundingBox.top = this.projectile2.boundingBox.top;
	this.projectile.boundingBox.bottom = this.projectile3.boundingBox.bottom;

	//this.projectile.boundingBox.width = Math.abs(this.projectile.boundingBox.right - this.projectile.boundingBox.left);
	this.projectile.boundingBox.height = Math.abs(this.projectile.boundingBox.top - this.projectile.boundingBox.bottom);
};

MonolithPaddle.prototype.update = function( deltaTime ) {
	Paddle.prototype.update.call( this, deltaTime );
	this.velocity = this.velocity.multiply( 0.9 );

	if( this.projectile === null ) {
		this.projectile2 = null;
		this.projectile3 = null;
	}

	if( this.projectile2 ) {
		this.projectile2.update( deltaTime );
	}

	if( this.projectile3 ) {
		this.projectile3.update( deltaTime );
	}

	if( this.projectile && this.projectile2 && this.projectile3 ) {
		this.updateRocksBoundingBox( );
	}
};