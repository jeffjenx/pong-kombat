function Background( resource ) {
	Component.call( this );
	
	if( Resources[resource] !== undefined )
	{
		this.resource = resource;
		this.image = Resources[resource];
	}

	this.size.x = viewport.width;
	this.size.y = viewport.height;
	this.position.x = 0;
	this.position.y = 0;
};

Background.prototype = new Component;
Background.prototype.constructor = Background;

Background.prototype.draw = function( context ) {
	// No need to draw bounding box
	//Component.prototype.draw.call( this, context );

	context.drawImage( this.image, this.position.x, this.position.y, this.size.x, this.size.y );
};