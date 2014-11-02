function ParticleSystem( particleCount ) {
	this.particles = [ ];
	/*
	this.particleCanvas = document.createElement( 'canvas' );
	this.particleCanvas.width = 128;
	this.particleCanvas.height = 128;
	this.particleContext = this.particleCanvas.getContext( '2d' );
	*/
	
	this.particleImages = [Resources['Particle-Fire1'], Resources['Particle-Fire2'], Resources['Particle-Fire3']];
	this.count = 0;
	
	this.minVelocity = new Vector( );
	this.minVelocity.x = -viewport.width;
	this.minVelocity.y = -viewport.height;
	
	this.maxVelocity = new Vector( );
	this.maxVelocity.x = viewport.width;
	this.maxVelocity.y = viewport.height;
	
	this.position = new Vector( );
	this.position.x = viewport.width * 0.50;
	this.position.y = viewport.height * 0.50;
	
	this.size = new Vector( );
	this.size.x = viewport.width * 0.25;
	this.size.y = viewport.height * 0.25;
	
	this.minParticleSize = 0;
	this.maxParticleSize = viewport.height * 0.10;
	
	this.minLife = 20;
	this.maxLife = 30;
}

ParticleSystem.prototype.constructor = ParticleSystem;

ParticleSystem.prototype.start = function( ) {
	for( var i = 0; i < this.count; i++ )
	{
		this.particles.push( new Particle( this ) );
	}
};

ParticleSystem.prototype.draw = function( context ) {
	context.save( );
	context.globalCompositeOperation = "lighter";
	
	for(var i = 0; i < this.particles.length; i++)
	{
		//context.save();
		var p = this.particles[i];
		
		/*
		this.particleContext.clearRect( 0, 0, this.particleCanvas.width, this.particleCanvas.height );
		this.particleContext.save();
		this.particleContext.drawImage( p.image, 0, 0, this.particleCanvas.width, this.particleCanvas.height );
		this.particleContext.globalCompositeOperation = "source-atop";
		this.particleContext.fillStyle = "rgba("+p.r+", "+p.g+", "+p.b+",1)";
		this.particleContext.fillRect( 0, 0, this.particleCanvas.width, this.particleCanvas.height );
		this.particleContext.restore();
		context.drawImage( this.particleCanvas, p.position.x, p.position.y, p.radius * 2, p.radius * 2 );
		*/
		
		/*
		var gradient = context.createRadialGradient( p.position.x, p.position.y, 0, p.position.x, p.position.y, p.radius );
		//var gradient = context.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
		gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
		gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
		gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
		
		context.beginPath();
		context.fillStyle = gradient;
		context.arc( p.position.x, p.position.y, p.radius, Math.PI * 2, false );
		//context.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
		context.fill();
		*/
		
		////context.globalAlpha = p.opacity;
		//context.drawImage( p.image, p.position.x, p.position.y, p.radius * 2, p.radius * 2 );
		//context.globalCompositeOperation = "source-atop";
		//context.fillStyle = "rgba("+p.r+", "+p.g+", "+p.b+",1)";
		//context.fillRect( p.position.x, p.position.y, p.radius * 2, p.radius * 2 );
		//context.restore();
		
		context.save();
		context.globalAlpha = p.opacity;
		context.translate( p.position.x, p.position.y );
		context.rotate( p.rotation );
		context.drawImage( p.image, -p.radius * p.scale, -p.radius * p.scale, p.radius * 2 * p.scale, p.radius * 2 * p.scale );
		context.restore();
	}
	context.restore( );
};

ParticleSystem.prototype.update = function( deltaTime ) {
	for(var i = 0; i < this.particles.length; i++)
	{
		var p = this.particles[i];
		p.remainingLife--;
		p.opacity = Math.round(p.remainingLife/p.life*100)/100
		//p.radius--;
		//p.radius *= 0.9;
		
		p.position.x += p.velocity.x * deltaTime;
		p.position.y += p.velocity.y * deltaTime;
		//p.location.x += p.speed.x;
		//p.location.y += p.speed.y;
		
		p.rotation += Math.random( ) * 5 * deltaTime * p.rotationDirection;
		p.scale += Math.random( ) * 5 * deltaTime * p.scaleDirection;
		
		// Regenerate particles
		if( p.remainingLife < 0 || p.radius < 0 )
		{
			this.particles[i] = new Particle( this );
		}
	}
};

function Particle( emitter ) {
	this.image = emitter.particleImages[ Math.floor( Math.random( ) * emitter.particleImages.length ) ];
	//this.image = Resources['Particle-Fire1'];
	
	this.velocity = new Vector( );
	this.velocity.x = emitter.minVelocity.x + Math.random( ) * ( emitter.maxVelocity.x - emitter.minVelocity.x );
	this.velocity.y = emitter.minVelocity.y + Math.random( ) * ( emitter.maxVelocity.y - emitter.minVelocity.y );
	//this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
	
	this.position = new Vector( );
	this.position.x = emitter.position.x + Math.random( ) * emitter.size.x - emitter.size.x * 0.50;
	this.position.y = emitter.position.y + Math.random( ) * emitter.size.y - emitter.size.y * 0.50;
	//this.location = {x: viewport.width / 2, y: viewport.height / 2};
	
	this.radius = emitter.minParticleSize + Math.random( ) * ( emitter.maxParticleSize - emitter.minParticleSize );
	//this.radius = 10 + Math.random()*20;
	
	this.life = emitter.minLife + Math.random( ) * ( emitter.maxLife - emitter.minLife );
	//this.life = 20 + Math.random()*10;
	this.remainingLife = this.life;
	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*55);
	this.b = Math.round(Math.random()*0);
	this.opacity = 1;
	this.rotation = 0;
	this.scale = 1;
	
	this.rotationDirection = ( Math.random( ) > 0.5 ) ? 1 : -1;
	this.scaleDirection = ( Math.random( ) > 0.5 ) ? 1 : -1;
}