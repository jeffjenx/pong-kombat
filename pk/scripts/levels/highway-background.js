function HighwayBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Highway' );
	this.addComponent( 'Background', background );
}

HighwayBackgroundLayer.prototype = new Layer;
HighwayBackgroundLayer.prototype.constructor = HighwayBackgroundLayer;