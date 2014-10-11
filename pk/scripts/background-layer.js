function BackgroundLayer( scene ) {
	Layer.call( this, scene );
}

BackgroundLayer.prototype = new Layer;
BackgroundLayer.prototype.constructor = BackgroundLayer;

BackgroundLayer.prototype.draw = function( context ) {
	Layer.prototype.draw.call( this, context );
};

BackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );
};