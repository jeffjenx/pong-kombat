function WatercolorBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Watercolor' );
	this.addComponent( 'Background', background );
}

WatercolorBackgroundLayer.prototype = new Layer;
WatercolorBackgroundLayer.prototype.constructor = WatercolorBackgroundLayer;