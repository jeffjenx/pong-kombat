function BilliardsBall( texture ) {
	var textures = [ 'Ball-Billiards-1', 'Ball-Billiards-2', 'Ball-Billiards-3', 'Ball-Billiards-4', 'Ball-Billiards-5', 'Ball-Billiards-6', 'Ball-Billiards-7', 'Ball-Billiards-8', 'Ball-Billiards-9', 'Ball-Billiards-10', 'Ball-Billiards-11', 'Ball-Billiards-12', 'Ball-Billiards-13', 'Ball-Billiards-14', 'Ball-Billiards-15' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.enum = 'BILLIARDS_BALL';
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );

	this.patternCanvas.width = ( textures.indexOf( this.resource ) < 8 ) ? 330 : 256;
	this.patternCanvas.height = this.patternCanvas.width;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.addGlare( );
}

BilliardsBall.prototype = new Ball;
BilliardsBall.prototype.constructor = BilliardsBall;