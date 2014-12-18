function IceRiverBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Ice-River' );
	this.addComponent( 'Background', background );
}

IceRiverBackgroundLayer.prototype = new Layer;
IceRiverBackgroundLayer.prototype.constructor = IceRiverBackgroundLayer;