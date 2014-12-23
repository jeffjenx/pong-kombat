function ToxicPoolBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Toxic-Pool' );
	this.addComponent( 'Background', background );
}

ToxicPoolBackgroundLayer.prototype = new Layer;
ToxicPoolBackgroundLayer.prototype.constructor = ToxicPoolBackgroundLayer;