function IceRiverBackgroundLayer( scene ) {
	Layer.call( this, scene );

	this.background = new Sprite( 'Background-Ice-River' );
	this.background.size.x = viewport.width;
	this.background.size.y = viewport.height;
	this.background.position.x = viewport.width / 2;
	this.background.position.y = viewport.height / 2;
	this.addComponent( 'Background', this.background );
	
	var waterOverlayCount = 3;
	this.waterOverlays = [ ];
	for( var i = 0; i < waterOverlayCount; i++ )
	{
		var waterOverlay = new Background( 'Background-Ice-River' );
		waterOverlay.velocity.x = viewport.width * 0.11 * ( i + 1 );
		waterOverlay.opacity = 1 / waterOverlayCount;
		waterOverlay.scale = i + 1;
		waterOverlay.position.y = viewport.height * 0.5;
		waterOverlay.draw = function( context ) {
			context.save( );
			context.globalCompositeOperation = 'screen';
			context.globalAlpha = this.opacity * i / waterOverlayCount;
			context.drawImage( this.image, this.position.x, this.position.y - this.size.y * this.scale / 2, this.size.x * this.scale, this.size.y * this.scale );
			context.drawImage( this.image, this.position.x - this.size.x * this.scale, this.position.y - this.size.y * this.scale / 2, this.size.x * this.scale, this.size.y * this.scale );
			context.restore( );
		};
		this.addComponent( 'WaterOverlay' + i, waterOverlay );
		this.waterOverlays.push( waterOverlay );
	}

	this.effect = new ParticleSystem( );
	this.effect.position.x = -viewport.width * 0.5;
	this.effect.particleImages = [ ];
	for( var i = 1; i <= 14; i++ ){
		this.effect.particleImages.push( Resources['Particle-Iceberg'+i] );
	}
	//this.effect.particleImages = [Resources['Particle-Iceberg1'],Resources['Particle-Iceberg2'],Resources['Particle-Iceberg3'],Resources['Particle-Iceberg4'],Resources['Particle-Iceberg5'],Resources['Particle-Iceberg6'],Resources['Particle-Iceberg7']];
	this.effect.count = 25;
	this.effect.minVelocity.x = viewport.width * 0.11;
	this.effect.minVelocity.y = -viewport.height * 0.01;
	this.effect.maxVelocity.x = viewport.width * 0.12;
	this.effect.maxVelocity.y = viewport.height * 0.01;
	this.effect.minParticleSize = viewport.height * 0.11;
	this.effect.maxParticleSize = viewport.height * 0.18;
	this.effect.minLife = 1000;
	this.effect.maxLife = 2000;
	this.effect.maxOpacity = 1000;
	this.effect.rotationSpeed = 0.1;
	this.effect.scaleSpeed = 0;
	this.effect.size.y = viewport.height;
	this.effect.compositeOperation = 'screen';
	this.addComponent( 'Effect', this.effect );

	for( var j = 0; j < 5000; j++ )
	{
		this.effect.update( 1 / 60 );
	}
}

IceRiverBackgroundLayer.prototype = new Layer;
IceRiverBackgroundLayer.prototype.constructor = IceRiverBackgroundLayer;

IceRiverBackgroundLayer.prototype.draw = function( context ) {
	Layer.prototype.draw.call( this, context );
};


IceRiverBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	for( var i in this.waterOverlays ) {
		if( this.waterOverlays[i].position.x > this.waterOverlays[i].size.x * this.waterOverlays[i].scale ) {
			this.waterOverlays[i].position.x -= this.waterOverlays[i].size.x * this.waterOverlays[i].scale;
		}

		this.waterOverlays[i].opacity = 1 + Math.sin( i * Math.PI + app.gameTime / 1000 ) / 2;
		this.waterOverlays[i].scale = 1.5 + Math.sin( i * Math.PI + app.gameTime / 1000 ) / 10;
	}

	//this.background.scale = 1.5 + Math.sin( app.gameTime / 5000 ) / 10;
};