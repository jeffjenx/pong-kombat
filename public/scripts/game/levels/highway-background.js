function HighwayBackgroundLayer( scene ) {
	Layer.call( this, scene );
	
	var background = new Background( 'Background-Highway' );
	this.addComponent( 'Background', background );

	this.overpass = new Sprite( 'Overpass' );
	this.overpass.position.x = viewport.width * 0.54;
	this.overpass.position.y = viewport.height * 0.50;
	this.overpass.size.y = viewport.height * 1.1;
	this.overpass.size.x = Math.ceil(viewport.width * 0.54);

	this.vehicleSprites = [
		'Vehicle1',
		'Vehicle2',
		'Vehicle3',
		'Vehicle4',
		'Vehicle5',
		'Vehicle6',
		'Vehicle7',
		'Vehicle8',
		'Vehicle9',
		'Vehicle10',
		'Vehicle11',
		'Vehicle12',
		'Vehicle13',
		'Vehicle14',
		'Vehicle15',
		'Vehicle16',
		'Vehicle17',
		'Vehicle18',
		'Vehicle19',
		'Vehicle20',
		'Vehicle21',
		'Vehicle22',
		'Vehicle23',
		'Vehicle24',
		'Vehicle25',
		'Vehicle26'
	];

	this.horizontalLanes = [
		viewport.height * 0.20,
		viewport.height * 0.36,
		viewport.height * 0.59,
		viewport.height * 0.745
	];

	this.verticalLanes = [
		viewport.width * 0.34,
		viewport.width * 0.44,
		viewport.width * 0.575,
		viewport.width * 0.67
	];

	this.vehicleCounter = 0;
	this.vehicles = [ ];
	for( var i = 0; i < 11; i++ ) {
		this.addVehicle( );
	}

	this.vehicleSound = new Sound( 'Vehicle' );
}

HighwayBackgroundLayer.prototype = new Layer;
HighwayBackgroundLayer.prototype.constructor = HighwayBackgroundLayer;

HighwayBackgroundLayer.prototype.addVehicle = function( ) {
	var vehicle = new Sprite( this.vehicleSprites[ Math.floor( Math.random( ) * this.vehicleSprites.length ) ] );

	vehicle.size.x = viewport.width * 0.25;
	vehicle.size.y = viewport.width * 0.25;

	if( Math.random( ) > 0.5 ) {
		// Horizontal Roads
		vehicle.position.y = this.horizontalLanes[ Math.floor( Math.random( ) * this.horizontalLanes.length ) ];
		vehicle.position.x = -viewport.width + ( Math.random( ) * -viewport.width );
		vehicle.velocity.x = viewport.width * 0.33 + viewport.width * 0.05;
		if( vehicle.position.y < viewport.height * 0.50 ) {
			vehicle.position.x *= -1;
			vehicle.velocity.x *= -1;
			vehicle.rotation = 180;
		}
	} else {
		// Vertical Roads
		vehicle.position.x = this.verticalLanes[ Math.floor( Math.random( ) * this.verticalLanes.length ) ];
		vehicle.position.y = -viewport.height + ( Math.random( ) * -viewport.height );
		vehicle.velocity.y = viewport.width * 0.33 + viewport.width * 0.05; // use width, even though height seems logical
		vehicle.rotation = 90;
		if( vehicle.position.x > viewport.width * 0.50 ) {
			vehicle.position.y *= -1;
			vehicle.velocity.y *= -1;
			vehicle.rotation = -90;
		}
	}

	vehicle.updateBoundingBox( );

	var accidentFree = true;
	for( var i in this.vehicles ) {
		if( this.vehicles[i].resource === vehicle.resource )
		{
			this.addVehicle( );
			return;
		}

		if( Collision.RectRect( this.vehicles[i].boundingBox, vehicle.boundingBox ) )
		{
			this.addVehicle( );
			return;
		}
	}

	vehicle.id = 'Vehicle' + this.vehicleCounter;
	this.vehicles.push( vehicle );
	this.addComponent( vehicle.id, vehicle );
	this.vehicleCounter++;

	if( app.settings.SOUND_FX ) {
		this.vehicleSound.playOnce( );
	}
};

HighwayBackgroundLayer.prototype.draw = function( context ) {
	for( var i in this.components )
	{
		if( this.components[i].velocity.y === 0 )
		{
			this.components[i].draw( context );
		}
	}
	//Layer.prototype.draw.call( this, context );

	this.overpass.draw( context );

	for( var i in this.components )
	{
		if( this.components[i].velocity.y !== 0 )
		{
			this.components[i].draw( context );
		}
	}
};

HighwayBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	for( var i in this.vehicles ) {
		var vehicle = this.vehicles[i];
		if( vehicle.velocity.x > 0 && vehicle.position.x - vehicle.size.x * vehicle.scale > viewport.width * 1.5 ) {
			this.vehicles.splice( i, 1 );
			this.removeComponent( vehicle.id );
			this.addVehicle( );
		}
		if( vehicle.velocity.x < 0 && vehicle.position.x + vehicle.size.x * vehicle.scale < -viewport.width * 0.5 ) {
			this.vehicles.splice( i, 1 );
			this.removeComponent( vehicle.id );
			this.addVehicle( );
		}

		if( vehicle.velocity.y > 0 && vehicle.position.y - vehicle.size.y * vehicle.scale > viewport.height * 1.5 ) {
			this.vehicles.splice( i, 1 );
			this.removeComponent( vehicle.id );
			this.addVehicle( );
		}
		if( vehicle.velocity.y < 0 && vehicle.position.y + vehicle.size.y * vehicle.scale < -viewport.height * 0.5 ) {
			this.vehicles.splice( i, 1 );
			this.removeComponent( vehicle.id );
			this.addVehicle( );
		}
	}
};