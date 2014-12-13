function ForestBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Forest' );
	this.addComponent( 'Background', background );
}

ForestBackgroundLayer.prototype = new Layer;
ForestBackgroundLayer.prototype.constructor = ForestBackgroundLayer;