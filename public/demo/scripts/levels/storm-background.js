function StormBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Storm' );
	this.addComponent( 'Background', background );
}

StormBackgroundLayer.prototype = new Layer;
StormBackgroundLayer.prototype.constructor = StormBackgroundLayer;