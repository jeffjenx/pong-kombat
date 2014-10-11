function Matrix( m ) {
	if( m instanceof Array )
	{
		this.v1 = new Vector( v[0] );
		this.v2 = new Vector( v[1] );
	}
	else
	{
		this.v1 = new Vector( );
		this.v2 = new Vector( );
	}
};

Matrix.prototype.constructor = Matrix;