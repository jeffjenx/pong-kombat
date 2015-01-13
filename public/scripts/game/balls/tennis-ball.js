function TennisBall( texture ) {
	var textures = [ 'Ball-Table-Tennis-Orange', 'Ball-Table-Tennis-White', 'Ball-Tennis' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = (this.resource === 'Ball-Tennis') ? viewport.width * 0.033 : viewport.width * 0.025;
	this.size.y = this.size.x;
	this.addGlare( );
}

TennisBall.prototype = new Ball;
TennisBall.prototype.constructor = TennisBall;