function Emoticon( texture ) {
	var textures = [ 'Ball-Emoticon-Angry', 'Ball-Emoticon-Frowning', 'Ball-Emoticon-Grinning', 'Ball-Emoticon-Shocked', 'Ball-Emoticon-Smiling', 'Ball-Emoticon-Winking' ];
	Ball.call( this, (textures.indexOf( texture ) >= 0) ? texture : textures[ Math.floor( Math.random( ) * textures.length ) ] );
	
	this.pattern = this.patternContext.createPattern( this.image, 'repeat' );
	
	this.patternCanvas.width = 330;
	this.patternCanvas.height = 330;
	
	this.patternContext.fillStyle = this.pattern;
	this.patternContext.rect( 0, 0, this.patternCanvas.width, this.patternCanvas.width );
	this.patternContext.fill( );
	
	this.addGlare( );
}

Emoticon.prototype = new Ball;
Emoticon.prototype.constructor = Emoticon;