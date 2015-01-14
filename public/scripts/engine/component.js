function Component( ) {
	/*
	this.position = new Vector( [viewport.width * 0.5, viewport.height * 0.5] );
	this.size = new Vector( [64, 64] );
	this.velocity = new Vector( [0, 0] );
	
	this.boundingBox = {
		top    : this.position.y - this.size.y / 2,
		right  : this.position.x + this.size.x / 2,
		bottom : this.position.y + this.size.y / 2,
		left   : this.position.x - this.size.x / 2,
		center :
		{
			x : this.position.x,
			y : this.position.y
		},
		width  : this.size.x,
		height : this.size.y
	};
	*/
	
	this.boundingBox = { bottom : 0, left : 0, right : 0, top : 0, width : 0, height : 0 };
	this.enabled = true;
	this.height = 64;
	this.opacity = 1.0;
	this.position = new Vector( [ viewport.width / 2, viewport.height / 2 ] );
	this.registration = new Vector( [ 0.5, 0.5 ] );
	this.rotation = 0;
	this.scale = 1.0;
	this.size = new Vector( [ 64, 64 ] );
	this.tint = false;
	this.velocity = copy( Vector.Zero );
	this.width = 64;
};

Component.prototype.constructor = Component;

/*
Component.prototype.draw = function( context )
{
	if( app.drawComponentBounds )
	{
		context.save();
		context.translate( this.boundingBox.center.x, this.boundingBox.center.y );
		context.fillStyle = 'rgba( 255, 255, 0, 0.2)';
		context.strokeStyle = "yellow";
		context.rect( -this.boundingBox.width / 2, -this.boundingBox.height / 2, this.boundingBox.width, this.boundingBox.height );
		context.stroke();
		context.fill();
		context.restore();
	}
};

Component.prototype.update = function( deltaTime )
{
	if( this.velocity.x != 0 || this.velocity.y != 0 )
	{
		this.position.add( this.velocity );
	}
	
	// Update Bounding Box
	this.boundingBox.top = this.position.y - this.size.y / 2;
	this.boundingBox.right = this.position.x + this.size.x / 2;
	this.boundingBox.bottom = this.position.y + this.size.y / 2;
	this.boundingBox.left = this.position.x - this.size.x / 2;
	this.boundingBox.center.x = this.position.x;
	this.boundingBox.center.y = this.position.y;
	this.boundingBox.width = this.size.x * this.scale;
	this.boundingBox.height = this.size.y * this.scale;
};
*/


Component.prototype.draw = function( context ) {
	if( !this.enabled )
	{
		return;
	}
	
	if( app.drawComponentBounds )
	{
		context.save();
		context.fillStyle = 'rgba( 255, 255, 0, 0.2)';
		context.strokeStyle = "yellow";
		context.rect( this.boundingBox.left, this.boundingBox.top, this.boundingBox.width, this.boundingBox.height );
		context.stroke();
		context.fill();
		context.restore();
	}
};

Component.prototype.update = function( deltaTime ) {
	if( !this.enabled )
	{
		return;
	}
	
	this.position = this.position.add( this.velocity.multiply( deltaTime ) );
	
	this.updateBoundingBox( );
	this.updateSize( );
};

Component.prototype.isWithinViewport = function() {
	return (this.boundingBox.right < 0 || this.boundingBox.left > viewport.width || this.boundingBox.top < 0 || this.boundingBox.bottom > viewport.height);
};

Component.prototype.updateBoundingBox = function( ) {
	// componentBox is boundingBox before appling rotation
	var componentBox = {
		top : this.position.y + this.size.y * ( 1 - this.registration.y ) * this.scale,
		left : this.position.x - this.size.x * this.registration.x * this.scale,
		right : this.position.x + this.size.x * ( 1 - this.registration.x ) * this.scale,
		bottom : this.position.y - this.size.y * this.registration.y * this.scale
	};
	
	var points = [
		'top-left',
		'top-right',
		'bottom-right',
		'bottom-left'
	];
	
	this.boundingBox = copy( componentBox );
	
	for( var i in points ) {
		var x = componentBox[ points[i].split('-')[1] ];
		var y = componentBox[ points[i].split('-')[0] ];
		
		var x0 = this.position.x;
		var y0 = this.position.y;
		
		var r = this.rotation * Math.TO_RADIANS;
		
		var x2 = x0 + (x-x0) * Math.cos(r) + (y-y0) * Math.sin(r);
		var y2 = y0 - (x-x0) * Math.sin(r) + (y-y0) * Math.cos(r);
		
		if( x2 < this.boundingBox.left ) {
			this.boundingBox.left = x2;
		}
		if( x2 > this.boundingBox.right ) {
			this.boundingBox.right = x2;
		}
		if( y2 < this.boundingBox.top ) {
			this.boundingBox.top = y2;
		}
		if( y2 > this.boundingBox.bottom ) {
			this.boundingBox.bottom = y2;
		}
	}
	
	this.boundingBox.width = Math.abs(this.boundingBox.right - this.boundingBox.left);
	this.boundingBox.height = Math.abs(this.boundingBox.top - this.boundingBox.bottom);
};

Component.prototype.updateSize = function( ) {
	this.height = this.size.y * this.scale;
	this.width = this.size.x * this.scale;
};