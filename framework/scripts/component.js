function Component( ) {
	this.boundingBox = { bottom : 0, left : 0, right : 0, top : 0 };
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

Component.prototype.draw = function( context ) {
	if( !this.enabled )
	{
		return;
	}
	
	if( app.drawComponentBounds )
	{
		context.strokeStyle = "white";
		context.strokeRect( this.boundingBox.left, this.boundingBox.top, this.boundingBox.right - this.boundingBox.left, this.boundingBox.bottom - this.boundingBox.top );
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

Component.prototype.updateBoundingBox = function( ) {
	this.boundingBox = {
		bottom : this.position.y + this.size.y * ( 1 - this.registration.y ) * this.scale,
		left : this.position.x - this.size.x * this.registration.x * this.scale,
		right : this.position.x + this.size.x * ( 1 - this.registration.x ) * this.scale,
		top : this.position.y - this.size.y * this.registration.y * this.scale
	};
};

Component.prototype.updateSize = function( ) {
	this.height = this.size.y * this.scale;
	this.width = this.size.x * this.scale;
};