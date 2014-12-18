function Sprite( resource ) {
	Component.call( this );
	
	if( Resources[resource] !== undefined )
	{
		this.resource = resource;
		this.flipH = false;
		this.image = Resources[resource];
		this.size = new Vector( [ this.image.width, this.image.height ] );
	}
};

Sprite.prototype = new Component;
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function( context ) {
	Component.prototype.draw.call( this, context );
	
	if( !this.enabled )
	{
		return;
	}
	
	if( !this.tint )
	{
		context.save( );
		context.globalAlpha *= this.opacity;
		context.translate( this.position.x, this.position.y );
		context.rotate( this.rotation * Math.TO_RADIANS );
		if( this.flipH )
		{
			context.scale( -1, 1 );
		}
		
		context.drawImage( this.image, -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		context.restore( );
	}
	else
	{
		var tint = document.createElement( 'canvas' );
		tint.width = this.image.width;
		tint.height = this.image.height;
		var tintContext = tint.getContext( '2d' );

		tintContext.fillStyle = this.tint.Hex( );
		tintContext.fillRect( 0, 0, tint.width, tint.height );
		
		tintContext.globalCompositeOperation = "destination-atop";
		tintContext.drawImage( this.image, 0, 0 );
		
		context.save( );
		context.translate( this.position.x, this.position.y );
		context.rotate( this.rotation * Math.TO_RADIANS );
		if( this.flipH )
		{
			context.scale( -1, 1 );
		}
		
		context.save( );
		context.globalAlpha = this.opacity;
		context.drawImage( this.image, -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		context.restore( );
		
		context.globalAlpha = this.tint.alpha;
		context.drawImage( tint, -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		context.restore( );
	}
	
	if( app.drawSpriteBounds )
	{
		context.save( );
		context.globalAlpha = this.opacity;
		context.translate( this.position.x, this.position.y );
		context.rotate( this.rotation * Math.TO_RADIANS );
		context.strokeStyle = "yellow";
		context.strokeRect( -this.size.x * this.registration.x * this.scale, -this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
		context.restore( );
	}
};