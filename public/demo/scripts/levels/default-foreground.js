function DefaultForegroundLayer( scene ) {
	Layer.call( this, scene );
	
	var glare = new Sprite( 'TV-Glare' );
	glare.size.x = viewport.width;
	glare.size.y = viewport.height;
	this.addComponent( 'Glare', glare );
}

DefaultForegroundLayer.prototype = new Layer;
DefaultForegroundLayer.prototype.constructor = DefaultForegroundLayer;