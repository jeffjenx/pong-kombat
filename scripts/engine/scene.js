function Scene( ) {
	this.layers = { };
	this.components = { };
	
	
	this.timeElapsed = 0;
}

Scene.prototype.constructor = Scene;

Scene.prototype.addLayer = function( id, layer ) {
	this.layers[id] = layer;
	return this.layers[id];
};

Scene.prototype.draw = function( context ) {
	//context.fillStyle = new Color( 128, 128, 128 ).Hex( );
	//context.fillRect( 0, 0, viewport.width, viewport.height );
	
	for( i in this.layers )
	{
		this.layers[i].draw( context );
	}
	
	for( i in this.components )
	{
		this.components[i].draw( context );
	}
};

Scene.prototype.removeComponent = function( id ) {
	delete this.components[id];
};

Scene.prototype.removeLayer = function( id ) {
	delete this.layers[id];
};

Scene.prototype.updateIn = function( transitionPercent ) { };
Scene.prototype.updateOut = function( transitionPercent ) { };

Scene.prototype.update = function( deltaTime ) {
	if( !SceneManager.transitioning )
	{
		this.timeElapsed += deltaTime;
	}
	
	for( i in this.layers )
	{
		this.layers[i].update( deltaTime );
	}
	
	for( i in this.components )
	{
		this.components[i].update( deltaTime );
	}
};