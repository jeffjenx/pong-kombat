function Background( resource ) {
	Component.call( this );
	
	if( Resources[resource] !== undefined )
	{
		this.image = Resources[resource];
	}
};

Background.prototype = new Component;
Background.prototype.constructor = Background;

Background.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	context.drawImage( this.image, 0, 0, viewport.width, viewport.height );
};