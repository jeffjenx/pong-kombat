function PortalBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Portal' );
	this.addComponent( 'Background', background );
}

PortalBackgroundLayer.prototype = new Layer;
PortalBackgroundLayer.prototype.constructor = PortalBackgroundLayer;