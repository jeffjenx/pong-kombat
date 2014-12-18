Levels = {
	RANDOM : 0,
	DEFAULT : 1,
	FOREST : 2,
	HELL : 3,
	HIGHWAY : 4,
	ICE_RIVER : 5,
	PIT : 6,
	PORTAL : 7,
	STORM : 8,
	TOWER : 9,
	TOXIC_POOL : 10,
	WATERCOLOR : 11
};

// LEVELS are defined as a BACKGROUND and FOREGROUND

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

function ForegroundLayer( scene ) {
	Layer.call( this, scene );
}

ForegroundLayer.prototype = new Layer;
ForegroundLayer.prototype.constructor = ForegroundLayer;

ForegroundLayer.prototype.draw = function( context ) {
	Layer.prototype.draw.call( this, context );
};

ForegroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );
};