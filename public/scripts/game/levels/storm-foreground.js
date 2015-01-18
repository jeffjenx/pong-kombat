function StormForegroundLayer( scene ) {
	Layer.call( this, scene );

	this.addLightning( );

	this.stormSound = new Sound( 'Storm' );
	if( app.settings.SOUND_FX > 0 ) {
		this.stormSound.loop();
	}
}

StormForegroundLayer.prototype = new Layer;
StormForegroundLayer.prototype.constructor = StormForegroundLayer;

StormForegroundLayer.prototype.addLightning = function( ) {
	if( Math.random( ) > 0.33 ) {
		var strike = new Sprite( Math.random( ) > 0.5 ? 'Lightning-1' : 'Lightning-2' );
		strike.opacity = 0.75;
		strike.size.x = viewport.width * (1 + Math.random( ) * 0.5);
		strike.size.y = viewport.height * (1 + Math.random( ) * 0.5);
		strike.flipH = (Math.random( ) > 0.5 );
		strike.rotation = (Math.random( ) > 0.5) ? 180 : 0;
		strike.draw = function( context ) {
			context.save();
			context.globalCompositeOperation = 'screen';
			Sprite.prototype.draw.call( this, context );
			context.restore();
		};
		this.addComponent( 'Strike', strike );
	}
	
	var lightning = new Sprite( 'White' );
	lightning.frames = 0;
	lightning.size.x = viewport.width;
	lightning.size.y = viewport.height;
	lightning.lifetime = 25 + Math.random( ) * 75;
	lightning.draw = function( context ) {
		context.save();
		context.globalCompositeOperation = 'overlay';
		Sprite.prototype.draw.call( this, context );
		Sprite.prototype.draw.call( this, context );
		context.restore();
	};
	this.addComponent( 'Lightning', lightning );
};

StormForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	var lightning = this.components['Lightning'];
	if( lightning ) {
		lightning.frames += 1;

		if( lightning.frames > 3 ) {
			lightning.frames = 0;
			lightning.opacity = Math.random( );
		}

		lightning.lifetime -= 1;

		if( lightning.lifetime <= 0 ) {
			this.removeComponent( 'Lightning' );
			this.nextLightning = Date.now( ) + 5000 + Math.random( ) * 7000;
		}
	}
	else if( Date.now( ) > this.nextLightning )
	{
		this.addLightning( );
	}

	var strike = this.components['Strike'];
	if( strike ) {
		strike.opacity -= Math.random( ) * 0.20 - 0.05;
		if( strike.opacity <= 0 ) {
			this.removeComponent( 'Strike' );
		}
	}
};