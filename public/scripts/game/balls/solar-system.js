function SolarSystem( ) {
	var textures = [ 'Ball-Asteroid', 'Ball-Sun', 'Ball-Moon', 'Ball-Mercury', 'Ball-Venus', 'Ball-Earth', 'Ball-Mars', 'Ball-Saturn', 'Ball-Neptune', 'Ball-Uranus', 'Ball-Jupiter', 'Ball-Pluto' ];
	textures = ['Ball-Pluto'];

	Ball.call( this, textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	//this.size.x = viewport.width * 0.06;
	this.size.x = viewport.width;
	switch( this.resource ) {
		case 'Ball-Asteroid' : this.size.x *= 0.04; break;
		case 'Ball-Sun' :      this.size.x *= 0.07; break;
		case 'Ball-Moon' :     this.size.x *= 0.033; break;
		case 'Ball-Mercury' :  this.size.x *= 0.035; break;
		case 'Ball-Venus' :    this.size.x *= 0.059; break;
		case 'Ball-Earth' :    this.size.x *= 0.06; break;
		case 'Ball-Mars' :     this.size.x *= 0.05; break;
		case 'Ball-Saturn' :   this.size.x *= 0.063; break;
		case 'Ball-Neptune' :  this.size.x *= 0.061; break;
		case 'Ball-Uranus' :   this.size.x *= 0.065; break;
		case 'Ball-Jupiter' :  this.size.x *= 0.067; break;
		case 'Ball-Pluto' :    this.size.x *= 0.025; break;
	}
	this.size.y = this.size.x;
	this.addGlare( );
}

SolarSystem.prototype = new Ball;
SolarSystem.prototype.constructor = SolarSystem;

SolarSystem.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	if( !this.enabled ) {
		return;
	}
	
	context.save( );
	context.globalAlpha *= this.opacity;
	context.translate( this.position.x, this.position.y );
	context.rotate( this.rotation * Math.TO_RADIANS );
	if( Math.abs(this.rotation) > 90 && Math.abs(this.rotation) < 180 ) {
		context.scale( 1, -1 );
	}
	context.beginPath();
	context.arc(0, 0, this.size.x * this.scale * 0.49, 0, 2 * Math.PI, false);
	context.clip();
	
	this.patternContext.translate( this.offset.x, 0 );
	this.patternContext.fill( );
	this.patternContext.translate( -this.offset.x, 0 );
	
	context.drawImage(
		this.patternCanvas,
		0,
		0,
		this.patternCanvas.width,
		this.patternCanvas.height,
		-this.size.x * this.scale * 0.50,
		-this.size.y * this.scale * 0.50,
		this.size.x * this.scale,
		this.size.y * this.scale
	);
	context.restore( );
	
	if( this.glare ){
		this.glare.draw(context);
	}
};

SolarSystem.prototype.update = function( deltaTime ) {
	if( this.scale < 1 ) {
		this.scale += 3.3 * deltaTime;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = this.scale * 0.666;
		}
	} else {
		this.scale = this.scale;
		if( this.glare ) {
			this.glare.scale = this.scale;
			this.glare.opacity = 0.666;
		}
		Sprite.prototype.update.call( this, deltaTime );
	}
	
	this.offset.x += 64 * deltaTime;
	
	this.updateGlare( deltaTime );
};