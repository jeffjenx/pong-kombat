function DefaultBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Default' );
	this.addComponent( 'Background', background );
}

DefaultBackgroundLayer.prototype = new Layer;
DefaultBackgroundLayer.prototype.constructor = DefaultBackgroundLayer;