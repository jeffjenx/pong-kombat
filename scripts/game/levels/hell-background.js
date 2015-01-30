function HellBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Hell' );
	this.addComponent( 'Background', background );

	this.heatEffect = new ParticleSystem( );
	this.heatEffect.compositeOperation = 'color-dodge';
	this.heatEffect.particleImages = [Resources['Particle-Fire1'], Resources['Particle-Fire2'], Resources['Particle-Fire3']];
	this.heatEffect.count = 5;
	this.heatEffect.minVelocity.x = 0;
	this.heatEffect.minVelocity.y = 0;
	this.heatEffect.maxVelocity.x = 0;
	this.heatEffect.maxVelocity.y = 0;
	this.heatEffect.minParticleSize = viewport.width * 0.3;
	this.heatEffect.maxParticleSize = viewport.width * 0.5;
	this.heatEffect.minLife = 50;
	this.heatEffect.maxLife = 300;
	this.heatEffect.maxOpacity = 1.5;
	this.heatEffect.rotationSpeed = 0;
	this.heatEffect.scaleSpeed = 0;
	this.heatEffect.size.x = viewport.width;
	this.heatEffect.size.y = viewport.height;
	this.addComponent( 'HeatEffect', this.heatEffect );

	for( var j = 0; j < 300; j++ )
	{
		this.heatEffect.update( 1 / 60 );
	}

	/*
	this.smokeEffect = new ParticleSystem( );
	this.smokeEffect.compositeOperation = 'normal';
	this.smokeEffect.particleImages = [Resources['Particle-Smoke2']];
	this.smokeEffect.count = 5;
	this.smokeEffect.minVelocity.x = -viewport.width * 0.25;
	this.smokeEffect.minVelocity.y = viewport.height * 0.25;
	this.smokeEffect.maxVelocity.x = viewport.width * 0.25;
	this.smokeEffect.maxVelocity.y = -viewport.height * 0.25;
	this.smokeEffect.minParticleSize = viewport.width * 0.1;
	this.smokeEffect.maxParticleSize = viewport.width * 0.25;
	this.smokeEffect.minLife = 300;
	this.smokeEffect.maxLife = 500;
	this.smokeEffect.maxOpacity = 0.2;
	this.smokeEffect.rotationSpeed = 1;
	this.smokeEffect.scaleSpeed = 5;
	this.smokeEffect.size.x = viewport.width;
	this.smokeEffect.size.y = viewport.height;
	this.addComponent( 'Smoke', this.smokeEffect );

	for( var j = 0; j < 500; j++ )
	{
		this.smokeEffect.update( 1 / 60 );
	}
	*/
}

HellBackgroundLayer.prototype = new Layer;
HellBackgroundLayer.prototype.constructor = HellBackgroundLayer;