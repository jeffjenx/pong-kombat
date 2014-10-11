function Layer( scene ) {
	this.components = { };
	this.scene = scene;
}

Layer.prototype.constructor = Layer;

Layer.prototype.addComponent = function( id, object ) {
	this.components[id] = object;
	this.components[id].layer = this;
};

Layer.prototype.draw = function( context ) {
	for( var i in this.components )
	{
		this.components[i].draw( context );
	}
};

Layer.prototype.removeComponent = function( id ) {
	delete this.components[id];
};

Layer.prototype.update = function( deltaTime ) {
	for( var i in this.components )
	{
		this.components[i].update( deltaTime );
	}
};