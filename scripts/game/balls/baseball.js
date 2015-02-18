function Baseball( texture ) {
	var textures = [ 'Ball-Baseball', 'Ball-Baseball-MLB', 'Ball-Baseball-Old', 'Ball-Softball' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'BASEBALL';
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 256;
	this.patternCanvas.height = 256;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.size.x = (this.resource === 'Ball-Softball') ? viewport.width * 0.04 : viewport.width * 0.035;
	this.size.y = this.size.x;
	this.addGlare( );
}

Baseball.prototype = new Ball;
Baseball.prototype.constructor = Baseball;