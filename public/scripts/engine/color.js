function Color( red, green, blue, alpha ) {
	if( alpha == undefined )
	{
		alpha = 255;
	}
	else if( alpha > 1 )
	{
		alpha /= 255;
	}
	
	this.alpha = alpha;
	this.blue = blue;
	this.green = green;
	this.red = red;
};

Color.prototype.constructor = Color;

Color.prototype.Hex = function( ) {
	var r = this.red.toString( 16 ).padLeft( 2 );
	var g = this.green.toString( 16 ).padLeft( 2 );
	var b = this.blue.toString( 16 ).padLeft( 2 );
	
	return ( '#' + r + g + b ).toUpperCase( );
};

Color.prototype.RGB = function( ) {
	return 'rgb( ' + this.red + ', ' + this.green + ', ' + this.blue + ' )';
};

Color.prototype.RGBA = function( ) {
	return 'rgba( ' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alpha + ' )';
};