function PitBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Pit' );
	this.addComponent( 'Background', background );
}

PitBackgroundLayer.prototype = new Layer;
PitBackgroundLayer.prototype.constructor = PitBackgroundLayer;