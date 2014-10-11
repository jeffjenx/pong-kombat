function Vector( v ) {
	if( v instanceof Array )
	{
		this.x = v[0];
		this.y = v[1];
	}
	else
	{
		this.x = 0;
		this.y = 0;
	}
};

Vector.prototype.constructor = Vector;

Vector.prototype.add = function( v ) {
	if( !( v instanceof Vector ) )
	{
		return false;
	}
	
	return new Vector( [ this.x + v.x, this.y + v.y ] );
};

Vector.prototype.cross = function( ) {
	return new Vector( [ this.y, -this.x ] );
};

Vector.prototype.distance = function( v ) {
	if( !( v instanceof Vector ) )
	{
		return false;
	}
	
	return this.subtract( v ).length( );
};

Vector.prototype.divide = function( s ) {
	return new Vector( [ this.x / s, this.y / s ] );
};

Vector.prototype.dot = function( v ) {
	if( !( v instanceof Vector ) )
	{
		return false;
	}
	
	return ( this.x * v.x ) + ( this.y * v.y );
};

Vector.prototype.length = function( ) {
	return Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
};

Vector.prototype.multiply = function( s ) {
	return new Vector( [ this.x * s, this.y * s ] );
};

Vector.prototype.normalize = function( ) {
	return this.divide( this.length( ) );
};

Vector.prototype.rotate = function( r ) {
	return new Vector( [
		this.x * Math.cos( r ) - this.y * Math.sin( r ),
		this.x * Math.sin( r ) + this.y * Math.cos( r )
	] );
};

Vector.prototype.subtract = function( v ) {
	if( !( v instanceof Vector ) )
	{
		return false;
	}
	
	return new Vector( [ this.x - v.x, this.y - v.y ] );
};

Vector.East = new Vector( [ 1, 0 ] );
Vector.North = new Vector( [ 0, -1 ] );
Vector.South = new Vector( [ 0, 1 ] );
Vector.West = new Vector( [ -1, 0 ] );
Vector.Zero = new Vector( [ 0, 0 ] );