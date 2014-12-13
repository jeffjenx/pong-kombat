function HellBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Hell' );
	this.addComponent( 'Background', background );
}

HellBackgroundLayer.prototype = new Layer;
HellBackgroundLayer.prototype.constructor = HellBackgroundLayer;