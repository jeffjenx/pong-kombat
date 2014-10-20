function DefaultForegroundLayer( scene ) {
	Layer.call( this, scene );
}

DefaultForegroundLayer.prototype = new Layer;
DefaultForegroundLayer.prototype.constructor = DefaultForegroundLayer;