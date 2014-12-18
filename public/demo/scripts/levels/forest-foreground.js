function ForestForegroundLayer( scene ) {
	Layer.call( this, scene );

	var trees = new Sprite( 'Trees' );
	trees.size.x = viewport.width;
	trees.size.y = viewport.height;
	this.addComponent( 'Trees', trees );
}

ForestForegroundLayer.prototype = new Layer;
ForestForegroundLayer.prototype.constructor = ForestForegroundLayer;