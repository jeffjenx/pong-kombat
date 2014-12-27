function WatercolorBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Watercolor' );
	this.addComponent( 'Background', background );

	this.sun = new Sprite( 'Sun' );
	this.sun.position.x = viewport.width * 0.50;
	this.sun.position.y = viewport.height * 0.22;
	this.sun.size.y = viewport.height * 0.25;
	this.sun.size.x = this.sun.size.y;
	// sun component added to layer after rays

	this.softSunRays = new Sprite( 'Sun-Rays-1' );
	this.softSunRays.position.x = this.sun.position.x;
	this.softSunRays.position.y = this.sun.position.y;
	this.softSunRays.size.y = viewport.height * 0.50;
	this.softSunRays.size.x = this.softSunRays.size.y;
	this.softSunRays.draw = function( context ) {
		context.save( );
		context.globalCompositeOperation = 'multiply';
		Sprite.prototype.draw.call( this, context );
		context.restore( );
	};
	this.addComponent( 'SoftSunRays', this.softSunRays );

	this.hardSunRays = new Sprite( 'Sun-Rays-2' );
	this.hardSunRays.position.x = this.sun.position.x;
	this.hardSunRays.position.y = this.sun.position.y;
	this.hardSunRays.size.y = viewport.height * 0.55;
	this.hardSunRays.size.x = this.hardSunRays.size.y;
	this.addComponent( 'HardSunRays', this.hardSunRays );

	this.hardSunRays2 = new Sprite( 'Sun-Rays-2' );
	this.hardSunRays2.position.x = this.sun.position.x;
	this.hardSunRays2.position.y = this.sun.position.y;
	this.hardSunRays2.size.y = viewport.height * 0.55;
	this.hardSunRays2.size.x = this.hardSunRays2.size.y;
	this.hardSunRays2.rotation = 18;
	this.hardSunRays2.scale = 0.8;
	this.addComponent( 'HardSunRays2', this.hardSunRays2 );

	// add sun component after rays
	this.addComponent( 'Sun', this.sun );

	var flowerStem = new Sprite( 'Flower-Stem' );
	var flowerCount = 7;
	this.flowers = [ ];
	for( var i = 0; i < flowerCount; i++ ) {
		var flower = new Sprite( 'Flower' );
		flower.startPosition = {
			x : viewport.width / (flowerCount-1) * i,
			y : viewport.height * 0.80
		};
		flower.position.x = flower.startPosition.x;
		flower.position.y = flower.startPosition.y;
		flower.size.x = viewport.width * 0.08;
		flower.size.y = flower.size.x;
		flower.draw = function( context ) {
			context.drawImage( flowerStem.image, this.position.x - this.size.x * 0.33 * this.scale, this.position.y, viewport.width * 0.05, viewport.height * 0.3 );
			Sprite.prototype.draw.call( this, context );
		};
		this.addComponent( 'Flower' + i, flower );
		this.flowers.push( flower );
	}

	var grassCount = 33;
	this.grasses = [ ];
	for( var i = 0; i < grassCount; i++ ) {
		var grass = new Sprite( 'Grass' );
		grass.position.x = viewport.width / (grassCount-1) * i;
		grass.position.y = viewport.height * 1.05;
		grass.size.x = viewport.width * 0.11;
		grass.size.y = viewport.height * 0.18;
		grass.flipH = (Math.random( ) > 0.5) ? true : false;
		grass.rotation = Math.random( ) * 30 - 15;
		grass.flipRotation = (Math.random( ) > 0.5) ? true : false;
		grass.registration.y = 1;
		grass.draw = function( context ) {
			context.save( );
			context.globalCompositeOperation = 'multiply';
			Sprite.prototype.draw.call( this, context );
			context.restore( );
		};
		this.addComponent( 'Grass' + i, grass );
		this.grasses.push( grass );
	}
}

WatercolorBackgroundLayer.prototype = new Layer;
WatercolorBackgroundLayer.prototype.constructor = WatercolorBackgroundLayer;

WatercolorBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	this.softSunRays.rotation += 11 * deltaTime;
	if( this.softSunRays.rotation >= 360 ) {
		this.softSunRays.rotation -= 360;
	}

	this.hardSunRays.scale = 0.8 + (0.5 + Math.sin( app.gameTime / 500 ) * 0.5) * 0.2;
	this.hardSunRays2.scale = 0.8 + (0.5 + Math.sin( Math.PI + app.gameTime / 500 ) * 0.5) * 0.2;

	this.hardSunRays.rotation += 22 * deltaTime;
	if( this.hardSunRays.rotation >= 360 ) {
		this.hardSunRays.rotation -= 360;
	}

	this.hardSunRays2.rotation += 22 * deltaTime;
	if( this.hardSunRays2.rotation >= 360 ) {
		this.hardSunRays2.rotation -= 360;
	}

	for( var i in this.grasses ) {
		var grass = this.grasses[i];
		grass.rotation += (grass.flipRotation) ? (Math.random() * 15) * deltaTime : (Math.random() * -15) * deltaTime;
		if( grass.rotation >= 15 || grass.rotation <= -15 ) {
			grass.rotation = ( grass.rotation > 0 ) ? 15 : -15;
			grass.flipRotation = !grass.flipRotation;
		}
	}

	var flowerTime1 = Math.cos( app.gameTime / 1000 );
	var flowerTime2 = Math.sin( app.gameTime / 500 );
	for( var i in this.flowers ) {
		var flower = this.flowers[i];
		flower.rotation = flowerTime2 * 45 + 45 * i;
		flower.position.y = (i % 2 === 0) ? flower.startPosition.y + flowerTime1 * viewport.height * 0.02 : flower.startPosition.y + flowerTime2 * viewport.height * 0.02;
		flower.position.x = (i % 2 === 0) ? flower.startPosition.x + flowerTime2 * viewport.width * 0.02 : flower.startPosition.x + flowerTime1 * viewport.width * 0.02;
	}
};